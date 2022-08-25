import _ from "lodash";
import { MouseEventHandler, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import TextAreaComponent, { Session } from "../components/TextArea";
import { useLocalStorage } from "../utils/Storage";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [textareaActive, setTextareaActive] = useState(false);
  const [buttonActive, setButtonActive] = useState(true);

  const savedToast = () =>
    toast.success("🦄 Wow so easy!", {
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
    setButtonActive(false);
    if (sessions.at(-1)?.data.length === 0) setSessions(sessions.slice(0, -1));
    else savedToast();
  };

  const buttonClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!textareaActive) {
      startSession();
    }
  };

  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", []);
  const [keypress, setKeypress] = useState("");
  useEffect(() => {
    // for saving after session ends

    addEventListener("keypress", (e) => {
      setKeypress(e.key);

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
          className={`absolute button primary-button select-none ${
            textareaActive
              ? "animate-fade-out-up disabled"
              : "animate-fade-in-down"
          } `}
          onAnimationEnd={() => buttonActive || setButtonActive(false)}
        >
          Begin Session
        </button>
      )}

      {textareaActive && (
        <TextAreaComponent
          sessionState={[sessions, setSessions]}
          endSession={endSession}
        />
      )}
    </Layout>
  );
}
