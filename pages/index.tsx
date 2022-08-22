import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [pressedKey, setPressedKey] = useState("");
  const delay = 3000;

  const resetTextArea = () => {
    setTextareaValue("");
  };

  const keypressHandler: KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setPressedKey(event.code);

    if (event.code === "Enter") {
      event.preventDefault();
      resetTextArea();
      return;
    }
  };

  const [textareaValue, setTextareaValue] = useState("");
  const textareaChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setTextareaValue(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      resetTextArea();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [textareaValue]);

  return (
    <div className="h-screen py-2 flex flex-col justify-center items-center">
      <div className="px-8 flex-1 flex flex-col justify-center items-center">
        <textarea
          name="textarea"
          id="textarea"
          cols={30}
          rows={10}
          onKeyDown={keypressHandler}
          onChange={textareaChangeHandler}
          value={textareaValue}
          className="
          focus:outline-none
          resize-none
          text-3xl
        "
        />
      </div>
    </div>
  );
}
