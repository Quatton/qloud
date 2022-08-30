import _ from "lodash";
import React, { MouseEventHandler, Suspense, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import PageCard from "../../components/PageCard";
import { Session } from "../../components/TextArea";
import { useLocalStorage } from "../../utils/Storage";

type Props = {};

export default function Pages({}: Props) {
  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", []);
  const [editModeOn, setEditModeOn] = useState(false);

  if (_.find(sessions, (session) => session.data.length === 0))
    setSessions(_.filter(sessions, (session) => session.data.length > 0));

  const editButtonHandler: MouseEventHandler = (e) => {
    setEditModeOn(!editModeOn);
  };

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <div className="w-full max-w-4xl h-full flex flex-col justify-start items-center text-base text-sky-50">
          <div className="w-full flex flex-row p-1 mb-1 rounded-lg bg-sky-800/40">
            <button
              className={`button ${editModeOn && "bg-sky-800/40"}`}
              onClick={editButtonHandler}
            >
              Edit
            </button>
          </div>
          <div className="w-full max-h-full flex flex-col p-1 gap-1 overflow-y-auto rounded-lg bg-sky-800/40">
            {sessions.length ? (
              sessions.map((props) => (
                <div className="flex flex-row">
                  <PageCard
                    key={props.id}
                    remove={() => {
                      setSessions(
                        _.filter(sessions, (session) => session.id !== props.id)
                      );
                    }}
                    {...props}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-row justify-around">No data</div>
            )}
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}
