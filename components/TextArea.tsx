import { XMarkIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import React, {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocalStorage } from "../utils/Storage";
import FadeOutText from "./FadeOut";

type Props = {
  textareaActiveState: [boolean, Dispatch<SetStateAction<boolean>>];
};

export type Session = {
  id: number;
  data: string[];
};

type PrevCount = [number, string];

export default function TextArea({ textareaActiveState, sessionId }: Props) {
  //ref

  //for storing previousValue
  const prevCountRef = useRef<PrevCount[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //state
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaActive, setTextareaActive] = textareaActiveState;

  //localStorage
  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", []);

  //constant
  const DELAY = 3000;
  const MAXCH = 300;
  // resetTextArea
  const index = sessions.length - 1;

  //submit
  const submitTextArea = () => {
    const saveText = textareaValue.trim();
    if (textareaValue.length && textareaRef?.current) {
      // previous value animation
      prevCountRef.current.push([Date.now(), saveText]);

      // save in session
      setSessions([
        ...sessions.slice(0, index),
        {
          ...sessions[index],
          data: [...sessions[index].data, saveText],
        },
        ...sessions.slice(index + 1),
      ]);

      // empty
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
    if (event.code === "Enter") {
      event.preventDefault();
      submitTextArea();
      return;
    }
  };

  return (
    <>
      <div className="animate-fade-in-down flex w-full p-4 gap-2 items-center">
        <XMarkIcon
          className="icon z-40"
          onClick={() => {
            setTextareaActive(false);
            if (sessions.at(-1)?.data.length === 0)
              setSessions(sessions.slice(0, -1));
          }}
        />
        <p className="z-40 text-gray-500 font-italic">(CTRL+Q)</p>

        <p className="z-40  text-gray-500 ml-auto">
          {textareaValue.length}/{MAXCH}
        </p>
      </div>

      <div className="animate-fade-in-down relative h-full w-full">
        <textarea
          placeholder={sessions[index]?.data?.length === 0 ? "Enter Title" : ""}
          onKeyDown={keypressHandler}
          onChange={textareaChangeHandler}
          value={textareaValue}
          className={`
            textarea
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
              originalFontSize={originalFontSize}
            />
          );
        })}
      </div>
    </>
  );
}
