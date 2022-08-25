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
        px-2 md:px-4 py-2 border-b border-b-sky-200 cursor-pointer
        transition-all hover:scale-x-[1.005] hover:bg-sky-50
        "
      >
        <h1 className="justify-self-start self-start text-sm sm:text-xl font-semibold">
          {window.innerWidth > 768
            ? format(new Date(id), `${dateOptions.ymd} ${timeFormat}`)
            : format(new Date(id), `${dateOptions.ymdS} ${timeFormat}`)}
        </h1>
        <h1 className="truncate ... font-semibold text-sm sm:text-xl">
          {data[0] || "No data"}
        </h1>
      </div>
    </Link>
  );
}
