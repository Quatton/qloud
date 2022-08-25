import React, { AnimationEventHandler, memo, useState } from "react";
import useFitText from "use-fit-text";

type Props = {
  previousValue: string;
  onAnimationEnd: AnimationEventHandler<HTMLDivElement>;
};

function FadeOutText({ previousValue, onAnimationEnd }: Props) {
  const { fontSize, ref: textareaRef } = useFitText({});

  return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={`
          textarea
          absolute
          animate-fade-out-up
          select-none
          -z-40`}
      ref={textareaRef}
      contentEditable
      spellCheck
      style={{ fontSize }}
    >
      {previousValue}
    </div>
  );
}

export default memo(FadeOutText);
