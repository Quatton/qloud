import React, {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocalStorage } from "../utils/Storage";
import FadeOutText from "./FadeOut";

type Props = {
  active: boolean;
  saveState: [Session[], (value: Session[]) => void];
};

export type Session = {
  id: number;
  data: string[];
};

type PrevCount = [number, string, number];

export default function TextArea({ active, saveState }: Props) {
  if (!active) return null;

  const DELAY = 3000;
  const MAXCH = 300;

  const textareaRef: MutableRefObject<HTMLTextAreaElement | null> =
    useRef(null);
  useEffect(() => {
    prevCountRef.current = new Array<PrevCount>();
    textareaRef.current && textareaRef.current.focus();
  }, []);

  //for storing previousValue
  const prevCountRef = useRef<PrevCount[]>([]);

  const [textareaValue, setTextareaValue] = useState("");
  const textareaChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setTextareaValue(event.target.value);
  };

  const [sessions, setSessions] = saveState;

  const resetTextArea = () => {
    if (textareaValue.length && textareaRef?.current) {
      prevCountRef.current.push([
        Date.now(),
        textareaValue,
        parseInt(textareaRef.current.style.fontSize),
      ]);
      setSessions([
        ...sessions.slice(0, sessions.length - 1),
        {
          id: sessions[sessions.length - 1].id,
          data: [...sessions[sessions.length - 1].data, textareaValue],
        },
      ]);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      resetTextArea();
    }, DELAY);
    return () => {
      clearTimeout(timer);
    };
  }, [textareaValue]);

  //for autoFocus

  if (textareaValue.length >= MAXCH) {
    resetTextArea();
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="self-end mr-16 text-gray-500">
        {textareaValue.length}/{MAXCH}
      </p>

      <textarea
        name="textarea"
        id="textarea"
        cols={30}
        rows={10}
        onKeyDown={keypressHandler}
        onChange={textareaChangeHandler}
        value={textareaValue}
        className={`
        textarea transition-all ease-in-out
        `}
        ref={textareaRef}
      />

      {prevCountRef.current.map(([key, previousValue, originalFontSize]) => {
        return (
          <FadeOutText
            previousValue={previousValue}
            onAnimationEnd={() => {
              prevCountRef.current && prevCountRef.current.shift();
            }}
            key={key}
          />
        );
      })}
    </div>
  );
}
