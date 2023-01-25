import React, { createContext, ReactNode } from "react";
import { Session } from "../components/TextArea";
import { useLocalStorage } from "./Storage";

const initialValue = {
  sessions: new Array<Session>(),
  setSessions: (sessions: Session[]) => {},
};

export const SessionContext = createContext(initialValue);

export default function SessionProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", []);

  return (
    <SessionContext.Provider value={{ sessions, setSessions }}>
      {children}
    </SessionContext.Provider>
  );
}
