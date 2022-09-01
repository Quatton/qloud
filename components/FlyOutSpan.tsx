import React, { AnimationEventHandler, memo } from "react";

type Props = {
  char: string;
  seconds: string;
};

function FlyOutSpan({ char, seconds }: Props) {
  return (
    <span
      className={`
      inline-block 
      animate-[fly_2s_ease-out_forwards] 
      `}
      dangerouslySetInnerHTML={{ __html: char === " " ? "&nbsp;" : char }}
      style={{ animationDelay: seconds + "ms" }}
    ></span>
  );
}

export default memo(FlyOutSpan);
