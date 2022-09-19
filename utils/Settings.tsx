import React, { createContext, ReactNode } from "react";
import { useLocalStorage } from "./Storage";

export type Settings = {
  enableNotion: boolean;
  notionDatabaseId: string;
  notionToken: string;
};

const initialValue = {
  settings: {
    enableNotion: false,
    notionDatabaseId: "",
    notionToken: "",
  },
  setSettings: (settings: Settings) => {},
};

export const SettingContext = createContext(initialValue);

export default function SettingProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<Settings>("settings", {
    enableNotion: false,
    notionDatabaseId: "",
    notionToken: "",
  });

  return (
    <SettingContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingContext.Provider>
  );
}
