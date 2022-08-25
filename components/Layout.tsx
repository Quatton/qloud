import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, Suspense, useState } from "react";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Loading from "./Loading";

type Props = {
  children: ReactNode | ReactNode[];
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { pathname } = router;
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen overflow-y-auto flex flex-col justify-center items-center">
      <div className="w-full p-4 flex gap-2">
        <ArrowLeftIcon
          className="icon"
          onClick={() => {
            if (!loading) {
              setLoading(true);
              router.back();
            }
          }}
        />
        {pathname === "/" ? (
          <Link href="/pages">
            <DocumentTextIcon className="icon" />
          </Link>
        ) : (
          <Link href="/">
            <HomeIcon className="icon" />
          </Link>
        )}
      </div>

      <div
        className="w-full h-full flex flex-col justify-center p-4
      items-center animate-fade-in overflow-y-auto font-mono"
      >
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
