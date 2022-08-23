import { MouseEventHandler, useEffect, useState } from "react";
import Layout from "../components/Layout";
import TextArea from "../components/TextArea";

export default function Home() {
  const [textareaActive, setTextareaActive] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState("");
  const buttonClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    setTextareaActive(true);
  };

  return (
    <Layout>
      <button
        onClick={buttonClickHandler}
        className={`absolute button primary-button ${
          textareaActive && "animate-fade-out-up select-none"
        } ${buttonDisplay}`}
        onAnimationEnd={(e) => setButtonDisplay("none")}
      >
        Begin Session
      </button>
      <TextArea active={textareaActive} />
    </Layout>
  );
}
