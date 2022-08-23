import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Session } from "../../components/TextArea";
import { useLocalStorage } from "../../utils/Storage";

type Props = {};

export default function Pages({}: Props) {
  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", []);

  return (
    <Layout>
      <div className="w-full h-full flex flex-col p-8">
        {sessions.length ? (
          sessions.map(({ id, data }, i) => (
            <div className="flex flex-row justify-around">
              <h1>{id}</h1>
              <h1>{data[0] || "No data"}</h1>
            </div>
          ))
        ) : (
          <div className="flex flex-row justify-around">No data</div>
        )}
      </div>
    </Layout>
  );
}
