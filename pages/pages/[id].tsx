import React from "react";
import Layout from "../../components/Layout";
import { Session } from "../../components/TextArea";
import { useLocalStorage } from "../../utils/Storage";
import _ from "lodash";
import { useRouter } from "next/router";

type Props = {};

export default function Pages({}: Props) {
  const { query } = useRouter();

  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", []);
  const session = _.find(
    sessions,
    ({ id, data }) => id.toString() === query.id
  ) || { id: -1, data: ["Page not found"] };

  const { id, data } = session;
  return (
    <Layout>
      <div
        className="p-4 w-full h-full flex flex-col items-start 
        font-mono overflow-y-auto max-h-full rounded-lg bg-sky-800/80  text-sky-50"
      >
        <h1 className="text-4xl mb-4">{data[0]}</h1>
        {data.slice(1).map((text, i) => (
          <li className={`break-words text-2xl max-w-full`}>{text}</li>
        ))}
      </div>
    </Layout>
  );
}
