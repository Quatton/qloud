import React, { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
};

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
