import _ from "lodash";
import React, { AnimationEventHandler, memo } from "react";
import FlyOutSpan from "./FlyOutSpan";

type Props = {
  previousValue: string;
  onAnimationEnd: () => void;
};

function FlyOut({ previousValue, onAnimationEnd }: Props) {
  const length = previousValue.length;
  const MAX_TIME = 1000;
  return (
    <div
      className={`
        textarea select-none
        -z-40 ${
          previousValue.length > 18
            ? "text-xl sm:text-6xl"
            : "text-4xl sm:text-8xl"
        }
        animate-[fade-out-up_3s_ease-out_forwards]
      `}
      onAnimationEnd={onAnimationEnd}
    >
      {previousValue.split("").map((char, i) => (
        <FlyOutSpan
          char={char}
          key={i}
          seconds={Math.floor((i * MAX_TIME) / length).toString()}
        />
      ))}
    </div>
  );
}

export default memo(FlyOut);
