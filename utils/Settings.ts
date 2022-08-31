import { useLocalStorage } from "./Storage";

export type Setting = {
  notionPageId: string;
  notionToken: string;
};

const initialValue = {
  notionPageId: "",
  notionToken: "",
};

const settings = useLocalStorage("setting", initialValue);
