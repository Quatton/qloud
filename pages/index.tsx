import _ from "lodash";
import { MouseEventHandler, useEffect, useState } from "react";
import Layout from "../components/Layout";
import TextAreaComponent, { Session } from "../components/TextArea";
import { useLocalStorage } from "../utils/Storage";

export default function Home() {
  const [textareaActive, setTextareaActive] = useState(false);
  const [buttonActive, setButtonActive] = useState(true);

  const buttonClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!textareaActive) {
      const now = Date.now();
      setSessionId(now);
      setSessions([...sessions, { id: now, data: [] }]);
      setTextareaActive(true);
    }
  };

  const [sessionId, setSessionId] = useState(0);
  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", []);
  const [keypress, setKeypress] = useState("");
  useEffect(() => {
    // for saving after session ends

    addEventListener("keypress", (e) => {
      setKeypress(e.key);

      if (textareaActive && e.key === "") {
        e.preventDefault();
        setTextareaActive(false);
        if (sessions.at(-1)?.data.length === 0)
          setSessions(sessions.slice(0, -1));
      }

      // return key doesn't actually work
      if (!textareaActive && e.key === "Enter") {
        e.preventDefault();
        const now = Date.now();
        setSessionId(now);
        setSessions([...sessions, { id: now, data: [] }]);
        setTextareaActive(true);
      }

      return () => {
        removeEventListener("keypress", () => {});
      };
    });
  }, [textareaActive]);

  return (
    <Layout>
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

      {textareaActive && sessionId > 0 && (
        <TextAreaComponent
          sessionId={sessionId}
          textareaActiveState={[textareaActive, setTextareaActive]}
        />
      )}
    </Layout>
  );
}
