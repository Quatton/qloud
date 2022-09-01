import { Client } from "@notionhq/client";
import axios from "axios";

export async function createClient(auth: string) {
  if (typeof auth === "string") {
    return new Client({ auth });
  }
}

export async function saveOnDatabase(
  token: string,
  payload: {
    databaseId: string;
    data: string[];
  }
) {
  const res = axios.post("/api/notion", payload, {
    headers: { Authorization: token },
  });
  return res;
}
