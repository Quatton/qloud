import React, { AnimationEventHandler, memo, useState } from "react";

type Props = {
  previousValue: string;
  onAnimationEnd: AnimationEventHandler<HTMLTextAreaElement>;
};

function FadeOutText({ previousValue, onAnimationEnd }: Props) {
  return (
    <textarea
      value={previousValue}
      className={`
          textarea
          absolute
          animate-fade-out-up
          select-none
          -z-40 
          ${
            previousValue.length > 18
              ? "text-xl sm:text-6xl"
              : "text-4xl sm:text-8xl"
          }`}
      spellCheck
      onAnimationEnd={onAnimationEnd}
    />
  );
}

export default memo(FadeOutText);
