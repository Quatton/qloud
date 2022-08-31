import _ from "lodash";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import TextAreaComponent from "../components/TextArea";
import "react-toastify/dist/ReactToastify.css";
import { SettingContext } from "../utils/Settings";
import { SessionContext } from "../utils/Sessions";

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
    if (sessions.at(-1)?.data.length === 0) setSessions(sessions.slice(0, -1));
    else savedToast();
  };

  const buttonClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!textareaActive) {
      startSession();
    }
  };

  useEffect(() => {
    // for saving after session ends

    addEventListener("keypress", (e) => {
      if (textareaActive && e.key === "") {
        e.preventDefault();
        endSession();
      }

      // return key doesn't actually work
      if (!textareaActive && e.key === "Enter") {
        e.preventDefault();
        startSession();
      }

      return () => {
        removeEventListener("keypress", () => {});
      };
    });
  }, [textareaActive]);

  return (
    <Layout>
      <ToastContainer
        limit={1}
        position="top-center"
        autoClose={750}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />

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
