import { XMarkIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import React, {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocalStorage } from "../utils/Storage";
import FadeOutText from "./FadeOut";

type Props = {
  textareaActiveState: [boolean, Dispatch<SetStateAction<boolean>>];
  sessionId: number;
};

export type Session = {
  id: number;
  data: string[];
};

type PrevCount = [number, string, number];

export default function TextArea({ textareaActiveState, sessionId }: Props) {
  const [textareaActive, setTextareaActive] = textareaActiveState;
  if (!textareaActive || sessionId < 0) return null;

  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", []);

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
  const index = sessions.length - 1;

  const resetTextArea = () => {
    if (textareaValue.length && textareaRef?.current) {
      prevCountRef.current.push([
        Date.now(),
        textareaValue,
        parseInt(textareaRef.current.style.fontSize),
      ]);
      setSessions([
        ...sessions.slice(0, index),
        {
          id: sessions[index].id,
          data: [...sessions[index].data, textareaValue.trim()],
        },
        ...sessions.slice(index + 1),
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
    <>
      <div className="flex w-full p-4 gap-2 items-center">
        <XMarkIcon
          className="icon z-40"
          onClick={() => {
            setTextareaActive(false);
            if (sessions.at(-1)?.data.length === 0)
              setSessions(sessions.slice(0, -1));
          }}
        />
        <p className="z-40 text-gray-500 break-words text-sm">(CTRL + Q)</p>

        <p className="ml-auto z-40 text-gray-500 break-words">
          {textareaValue.length}/{MAXCH}
        </p>
      </div>

      <div className="relative h-full w-full border border-red-500">
        <textarea
          name="textarea"
          id="textarea"
          placeholder={sessions[index]?.data?.length === 0 ? "Enter Title" : ""}
          onKeyDown={keypressHandler}
          onChange={textareaChangeHandler}
          value={textareaValue}
          className={`
            textarea transition-all ease-in-out border
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
    </>
  );
}
