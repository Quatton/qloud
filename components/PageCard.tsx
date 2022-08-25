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

        p-4 md:px-8
        text-xl 
        "
      >
        <h1 className="">
          {window.innerWidth > 768
            ? format(new Date(id), `${dateOptions.ymd} ${timeFormat}`)
            : format(new Date(id), `${dateOptions.ymdS} ${timeFormat}`)}
        </h1>
        <h1 className="truncate ... max-w-[50%]">{data[0] || "No data"}</h1>
      </div>
    </Link>
  );
}
