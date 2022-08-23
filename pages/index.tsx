import { MouseEventHandler, useEffect, useState } from "react";
import Layout from "../components/Layout";
import TextAreaComponent from "../components/TextArea";

export default function Home() {
  const [textareaActive, setTextareaActive] = useState(false);

  const buttonClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    setTextareaActive(true);
  };

  useEffect(() => {
    addEventListener("keypress", (e) => {
      if (e.key === "") setTextareaActive(false);
      if (e.key === "Enter") setTextareaActive(true);
    });
  }, []);

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
      <TextAreaComponent active={textareaActive} />
    </Layout>
  );
}
