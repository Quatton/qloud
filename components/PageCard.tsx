import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  id: number;
  data: string[];
  remove: () => void;
};

export default function PageCard({ id, data, remove }: Props) {
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
    <div
      className="w-full flex flex-row items-center bg-sky-800/60
    transition-all p-3 rounded gap-2 hover:bg-sky-600/30"
    >
      <TrashIcon className="icon" onClick={() => remove()} />
      <Link href={`pages/${id.toString()}`}>
        <div
          className="
            w-full flex flex-row justify-between items-center
            cursor-pointer
            text-base sm:text-lg
          "
        >
          <h1 className="mr-auto">
            {format(new Date(id), `${dateOptions.ymd} ${timeFormat}`)}
          </h1>
          <h1 className="truncate ... max-w-[50%]">{data[0] || "No data"}</h1>
        </div>
      </Link>
    </div>
  );
}
