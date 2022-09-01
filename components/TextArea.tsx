import { Switch } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SessionContext } from "../utils/Sessions";
import FadeOut from "./FadeOut";
import FlyOut from "./FlyOut";

type Props = {
  endSession: () => void;
};

export type Session = {
  id: number;
  data: string[];
};

type PrevCount = [number, string];

export default function TextArea({ endSession }: Props) {
  //ref

  //for storing previousValue
  const prevCountRef = useRef<PrevCount[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  //state
  const [textareaValue, setTextareaValue] = useState("");
  const [advancedTextAnim, setAdvancedTextAnim] = useState(true);
  //sessions
  const { sessions, setSessions } = useContext(SessionContext);

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

  const [keypress, setKeypress] = useState("");
  const keypressHandler: KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setKeypress(event.key);
    if (event.key === "Enter") {
      event.preventDefault();
      submitTextArea();
      return;
    }
  };

  return (
    <>
      <div className="animate-fade-in-down flex w-full p-4 gap-2 items-center z-40">
        <XMarkIcon className="icon z-40" onClick={endSession} />
        <p className="z-40 hidden sm:block text-sky-200 font-italic rounded bg-sky-500/[0.4] px-2">
          CTRL+Q
        </p>

        <Switch
          checked={advancedTextAnim}
          onChange={setAdvancedTextAnim}
          className={`${
            advancedTextAnim ? "bg-sky-500/[0.6]" : "bg-sky-300/[0.6]"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              advancedTextAnim ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white`}
          />
        </Switch>

        <p className="z-40 text-sky-200 ml-auto rounded bg-sky-500/[0.6] px-2">
          {textareaValue.length}/{MAXCH}
        </p>
      </div>

      <div className="animate-fade-in-down relative h-full w-full">
        <>
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
                textarea placeholder-sky-200 ${
                  textareaValue.length > 18
                    ? "text-xl sm:text-6xl"
                    : "text-4xl sm:text-8xl"
                }
              `}
            ref={textareaRef}
            spellCheck
          />
          {prevCountRef.current.map(([key, previousValue]) =>
            advancedTextAnim ? (
              <FlyOut
                previousValue={previousValue}
                onAnimationEnd={() => {
                  prevCountRef.current.shift();
                }}
                key={key}
              />
            ) : (
              <FadeOut
                previousValue={previousValue}
                onAnimationEnd={() => {
                  prevCountRef.current.shift();
                }}
                key={key}
              />
            )
          )}
        </>
      </div>
    </>
  );
}
