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
        cursor-pointer bg-sky-800/60
        transition-all hover:bg-sky-600/30
        p-3 rounded
        text-base sm:text-lg
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
