import React, { createContext, ReactNode } from "react";
import { useLocalStorage } from "./Storage";

export type Settings = {
  notionDatabaseId: string;
  notionToken: string;
};

const initialValue = {
  settings: {
    notionDatabaseId: "",
    notionToken: "",
  },
  setSettings: (settings: Settings) => {},
};

export const SettingContext = createContext(initialValue);

export default function SettingProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<Settings>("settings", {
    notionDatabaseId: "",
    notionToken: "",
  });

  return (
    <SettingContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingContext.Provider>
  );
}
