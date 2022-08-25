import React, { AnimationEventHandler, memo, useState } from "react";

type Props = {
  previousValue: string;
  onAnimationEnd: AnimationEventHandler<HTMLTextAreaElement>;
};

function FadeOutText({ previousValue, onAnimationEnd }: Props) {
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
      readOnly
      onAnimationEnd={onAnimationEnd}
    />
  );
}

export default memo(FadeOutText);
