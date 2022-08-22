import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import FadeOut from "./FadeOut";

type Props = {};

export default function TextArea({}: Props) {
  const delay = 3000;

  const resetTextArea = () => {
    if (textareaValue.length) {
      prevCountRef.current.push([Date.now(), textareaValue]);
      setTextareaValue("");
    }
  };

  const keypressHandler: KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
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

  //for autoFocus
  const textareaRef: LegacyRef<HTMLTextAreaElement> = useRef(null);
  useEffect(() => {
    prevCountRef.current = [[Date.now(), ""]];
    textareaRef.current && textareaRef.current.focus();
  }, []);

  //for storing previousValue
  const prevCountRef = useRef<Array<[number, string]>>([[Date.now(), ""]]);

  return (
    <>
      <textarea
        name="textarea"
        id="textarea"
        cols={30}
        rows={10}
        onKeyDown={keypressHandler}
        onChange={textareaChangeHandler}
        value={textareaValue}
        className="
          textarea
          "
        ref={textareaRef}
      />

      {prevCountRef.current.map(([key, previousValue]) => {
        return (
          <FadeOut
            previousValue={previousValue}
            onAnimationEnd={() => {
              prevCountRef.current && prevCountRef.current.shift();
            }}
            key={key}
          />
        );
      })}
    </>
  );
}
