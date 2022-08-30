import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, ReactNode, Suspense, useState } from "react";
import {
  ArrowLeftIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Loading from "./Loading";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  children: ReactNode | ReactNode[];
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { pathname } = router;
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div
      className="
      h-screen overflow-y-auto flex flex-col justify-center items-center
      bg-gradient-to-tl from-sky-400 to-sky-200 animate-spinning-sky"
    >
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

        <Cog6ToothIcon className="icon ml-auto" onClick={() => openModal()} />

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Setting
                    </Dialog.Title>

                    <div className="mt-4">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Sample Setting
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>

      <div
        className="w-full h-full flex flex-col justify-center p-4
      items-center animate-fade-in overflow-y-auto"
      >
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
