import { XMarkIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import FadeOutText from "./FadeOut";

type Props = {
  sessionState: [Session[], (value: Session[]) => void];
  endSession: () => void;
};

export type Session = {
  id: number;
  data: string[];
};

type PrevCount = [number, string];

export default function TextArea({ sessionState, endSession }: Props) {
  //ref

  //for storing previousValue
  const prevCountRef = useRef<PrevCount[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //state
  const [textareaValue, setTextareaValue] = useState("");
  //localStorage
  const [sessions, setSessions] = sessionState;

  //constant
  const DELAY = 3000;
  const MAXCH = 100;

  //appendLastSession
  const appendLastSession = (text: string) => {
    setSessions([
      ...sessions.slice(0, -1),
      {
        ...sessions[sessions.length - 1],
        data: [...sessions[sessions.length - 1].data, text],
      },
    ]);
  };

  //submit
  const submitTextArea = () => {
    const saveText = textareaValue.trim();
    if (textareaValue.length && textareaRef?.current) {
      // previous value animation
      prevCountRef.current.push([Date.now(), saveText]);
      // save in session
      appendLastSession(saveText);
      setTextareaValue("");
    }
  };

  // when content hydrates
  useEffect(() => {
    prevCountRef.current = new Array<PrevCount>();
    textareaRef.current && textareaRef.current.focus();
  }, []);

  // timeout submit
  useEffect(() => {
    const submitTimer = setTimeout(() => {
      submitTextArea();
    }, DELAY);
    return () => {
      clearTimeout(submitTimer);
    };
  }, [textareaValue]);

  // force submit if exceeded
  if (textareaValue.length >= MAXCH) {
    submitTextArea();
  }

  // handlers
  const textareaChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setTextareaValue(event.target.value);
  };

  const keypressHandler: KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitTextArea();
      return;
    }
  };

  return (
    <>
      <div className="animate-fade-in-down flex w-full p-4 gap-2 items-center">
        <XMarkIcon className="icon z-40" onClick={endSession} />
        <p className="z-40 text-transparent sm:text-gray-500 font-italic">
          (CTRL+Q)
        </p>

        <p className="z-40 text-gray-500 ml-auto">
          {textareaValue.length}/{MAXCH}
        </p>
      </div>

      <div className="animate-fade-in-down relative h-full w-full">
        <textarea
          placeholder={
            sessions[sessions.length - 1].data?.length === 0
              ? "Enter Title"
              : ""
          }
          onKeyDown={keypressHandler}
          onChange={textareaChangeHandler}
          value={textareaValue}
          className={`
            textarea ${
              textareaValue.length > 18
                ? "text-xl sm:text-7xl"
                : "text-6xl sm:text-9xl"
            }
          `}
          ref={textareaRef}
          spellCheck
        />

        {prevCountRef.current.map(([key, previousValue]) => {
          return (
            <FadeOutText
              previousValue={previousValue}
              onAnimationEnd={() => {
                prevCountRef.current.shift();
              }}
              key={key}
            />
          );
        })}
      </div>
    </>
  );
}
