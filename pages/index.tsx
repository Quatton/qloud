import { useEffect, useState } from "react";
import TextArea from "../components/TextArea";

export default function Home() {
  return (
    <div className="h-screen py-2 flex flex-col justify-center items-center">
      <div className="px-8 flex-1 flex flex-col justify-center items-center">
        <TextArea />
      </div>
    </div>
  );
}
