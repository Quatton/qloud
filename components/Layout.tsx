import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  Fragment,
  ReactNode,
  Suspense,
  useContext,
  useState,
} from "react";
import {
  ArrowLeftIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Loading from "./Loading";
import { Dialog, Transition } from "@headlessui/react";
import { SettingContext } from "../utils/Settings";
import axios from "axios";

type Props = {
  children: ReactNode | ReactNode[];
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { pathname } = router;
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { settings, setSettings } = useContext(SettingContext);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function sendTestRequest() {
    axios
      .get("/api/notion", {
        params: {
          token: settings.notionToken,
          databaseId: settings.notionDatabaseId,
        },
      })
      .then((res) => {
        console.log("okay");
        switch (res.status) {
          case 200:
            alert(res.data.message);
            break;
          case 404:
            alert(res.data.message);
            break;
        }
      })
      .catch((err) => alert(err.message));
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
                        htmlFor="token"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Notion Internal Integration Token
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                          type="text"
                          name="notionToken"
                          id="token"
                          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="secret_"
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              notionToken: e.target.value,
                            })
                          }
                          value={settings.notionToken}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="dbId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Notion Database ID
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                          type="text"
                          name="notionDatabaseId"
                          id="notionDatabaseId"
                          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="https://www.notion.so/myworkspace/[--- Database ID ---]?v="
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              notionDatabaseId: e.target.value,
                            })
                          }
                          value={settings.notionDatabaseId}
                        />
                      </div>
                    </div>

                    <div className="relative mt-1 rounded-md shadow-sm">
                      <a
                        href="https://developers.notion.com/docs/getting-started"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-sm text-gray-700 hover:text-indigo-500"
                      >
                        Learn more
                      </a>
                    </div>

                    <div className="mt-4 flex flex-row gap-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={sendTestRequest}
                      >
                        Send Test Request
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
