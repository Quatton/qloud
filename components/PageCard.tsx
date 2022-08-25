import Link from "next/link";
import React from "react";
import { format } from "date-fns";

type Props = {
  id: number;
  data: string[];
};

export default function PageCard({ id, data }: Props) {
  const timeFormat = "HH:mm";
  const dateOptions = {
    ymd: "yyyy-MM-dd",
    dmy: "dd-MM-yyyy",
    mdy: "MM-dd-yyyy",
    ymdS: "yy-MM-dd",
    dmyS: "dd-MM-yy",
    mdyS: "MM-dd-yy",
  };

  return (
    <Link href={`pages/${id.toString()}`}>
      <div
        className="
        w-full flex flex-row justify-between 
        border-b border-b-sky-200 cursor-pointer
        transition-all hover:scale-x-[1.005] hover:bg-sky-50
        active:scale-x-[1.005] active:bg-sky-50
        px-2 py-4 sm:px-8
        text-base sm:text-xl 
        "
      >
        <h1 className="">
          {format(new Date(id), `${dateOptions.ymd} ${timeFormat}`)}
        </h1>
        <h1 className="truncate ... max-w-[50%]">{data[0] || "No data"}</h1>
      </div>
    </Link>
  );
}
