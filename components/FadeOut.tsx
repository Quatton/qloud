import React, { AnimationEventHandler, memo, useState } from "react";

type Props = {
  previousValue: string;
  onAnimationEnd: AnimationEventHandler<HTMLTextAreaElement>;
  originalFontSize: number;
};

function FadeOutText({
  previousValue,
  onAnimationEnd,
  originalFontSize,
}: Props) {
  return (
    <textarea
      name="textarea"
      id="textarea"
      value={previousValue}
      className={`
        textarea
        absolute
        animate-fade-out-up
        select-none
        -z-40
        `}
      style={{ fontSize: originalFontSize }}
      readOnly
      onAnimationEnd={onAnimationEnd}
    />
  );
}

export default memo(FadeOutText);
