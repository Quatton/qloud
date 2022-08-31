// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { APIErrorCode, isNotionClientError } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import Error from "next/error";
import { createClient } from "../../utils/notionUtil";

const notionAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    typeof req.query.token !== "string" ||
    typeof req.query.databaseId !== "string"
  ) {
    return res.status(404).json({ error: "Invalid requests" });
  }

  const notion = await createClient(req.query.token);

  if (typeof notion === "undefined") {
    return res.status(404).json({ error: "Invalid credentials" });
  }

  if (req.method === "GET") {
    try {
      const listUsersResponse = await notion.users.list({});
      const myPage = await notion.databases.query({
        database_id: req.query.databaseId,
      });
      return res.status(200).json({ message: "Success" });
    } catch (error: unknown) {
      if (isNotionClientError(error)) {
        switch (error.code) {
          case APIErrorCode.ObjectNotFound:
            return res.status(404).json({ message: "Database not found" });
          case APIErrorCode.Unauthorized:
            return res.status(404).json({ message: "Invalid credentials" });
        }
      }
    }
  }
};

export default notionAPI;
