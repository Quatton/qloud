import _ from "lodash";
import React, { Suspense } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import PageCard from "../../components/PageCard";
import { Session } from "../../components/TextArea";
import { useLocalStorage } from "../../utils/Storage";

type Props = {};

export default function Pages({}: Props) {
  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", []);

  if (_.find(sessions, (session) => session.data.length === 0))
    setSessions(_.filter(sessions, (session) => session.data.length > 0));

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <div className="w-full h-full flex flex-col p-2 sm:p-4 overflow-y-auto">
          {sessions.length ? (
            sessions.map((props) => <PageCard key={props.id} {...props} />)
          ) : (
            <div className="flex flex-row justify-around">No data</div>
          )}
        </div>
      </Suspense>
    </Layout>
  );
}
