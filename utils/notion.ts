import { Client } from "@notionhq/client";

async function createClient(auth: string) {
  if (typeof auth === "string") {
    return new Client({ auth });
  }
}
