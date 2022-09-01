import _ from "lodash";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import TextAreaComponent from "../components/TextArea";
import "react-toastify/dist/ReactToastify.css";
import { SettingContext } from "../utils/Settings";
import { SessionContext } from "../utils/Sessions";
import { saveOnDatabase } from "../utils/notionUtil";

export default function Home() {
  const [textareaActive, setTextareaActive] = useState(false);
  const [buttonActive, setButtonActive] = useState(true);
  const { sessions, setSessions } = useContext(SessionContext);
  const { settings, setSettings } = useContext(SettingContext);

  const savedToast = () =>
    toast.success("Saved!", {
      position: "top-center",
      autoClose: 750,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

  const startSession = () => {
    const now = Date.now();
    setSessions([...sessions, { id: now, data: [] }]);
    setTextareaActive(true);
    setButtonActive(false);
  };

  const endSession = () => {
    setTextareaActive(false);
    setButtonActive(true);
    if (sessions.at(-1)?.data.length === 0) {
      setSessions(sessions.slice(0, -1));
    } else {
      if (settings.enableNotion) {
        const res = saveOnDatabase(settings.notionToken, {
          databaseId: settings.notionDatabaseId,
          data: sessions.at(-1)?.data || [
            "This is probably a bug. Go tell me.",
          ],
        });
        toast.promise(
          res,
          {
            pending: {
              render: "Pending...",
              delay: undefined,
            },
            success: "Successfully Saved!",
            error: "Connection failed",
          },
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          }
        );
      }
    }
  };

  const buttonClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!textareaActive) {
      startSession();
    }
  };

  useEffect(() => {
    console.log("reinit");
    const keyPressHandler = (e: KeyboardEvent) => {
      if (textareaActive && e.ctrlKey && e.code === "KeyQ") {
        console.log(sessions);
        e.preventDefault();
        endSession();
      }

      // return key doesn't actually work
      if (!textareaActive && e.code === "Enter") {
        e.preventDefault();
        startSession();
      }
    };
    // for saving after session ends
    addEventListener("keypress", keyPressHandler);
    return () => {
      removeEventListener("keypress", keyPressHandler);
    };
  }, [textareaActive, sessions.at(-1)]);

  return (
    <Layout>
      {buttonActive && (
        <button
          onClick={buttonClickHandler}
          className={`absolute button select-none bg-sky-800/50
          hover:bg-sky-500/20 transition-all text-sky-50
          ${
            textareaActive
              ? "animate-fade-out-up disabled"
              : "animate-fade-in-down"
          } `}
          onAnimationEnd={() => buttonActive || setButtonActive(false)}
        >
          Begin Session
        </button>
      )}

      {textareaActive && <TextAreaComponent endSession={endSession} />}
    </Layout>
  );
}
