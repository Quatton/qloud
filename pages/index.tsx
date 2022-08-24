import { MouseEventHandler, useEffect, useState } from "react";
import Layout from "../components/Layout";
import TextAreaComponent, { Session } from "../components/TextArea";
import { useLocalStorage } from "../utils/Storage";

export default function Home() {
  const [textareaActive, setTextareaActive] = useState(false);

  const buttonClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!textareaActive) {
      e.preventDefault();
      setSessions([...sessions, { id: sessionId, data: [] }]);
      setTextareaActive(true);
    }
  };

  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", []);
  const sessionId = Date.now();
  useEffect(() => {
    // for saving after session ends

    addEventListener("keypress", (e) => {
      if (textareaActive && e.key === "") {
        e.preventDefault();
        setTextareaActive(false);
        if (!sessions[sessions.length - 1].data.length)
          setSessions(sessions.slice(0, sessions.length - 1));
      }

      // return key doesn't actually work
      if (!textareaActive && e.key === "Enter") {
        e.preventDefault();
        setSessions([...sessions, { id: sessionId, data: [] }]);
        setTextareaActive(true);
      }

      return () => {
        removeEventListener("keypress", () => {});
      };
    });
  }, [textareaActive]);

  return (
    <Layout>
      <button
        onClick={buttonClickHandler}
        className={`absolute button primary-button select-none ${
          textareaActive
            ? "animate-fade-out-up disabled"
            : "animate-fade-in-down"
        } `}
      >
        Begin Session
      </button>
      <TextAreaComponent
        saveState={[sessions, setSessions]}
        active={textareaActive}
      />
    </Layout>
  );
}
