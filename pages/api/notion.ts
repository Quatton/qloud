// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { APIErrorCode, isNotionClientError } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../../utils/notionUtil";

const notionAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const timer = setTimeout(() => {
    try {
      res.status(408).json({ error: "Request Timeout" });
    } catch (error) {
      console.log("http sent");
    }
  }, 5000);

  if (typeof req.headers.authorization !== "string")
    return res.status(401).json({ error: "Invalid requests" });

  const token = req.headers.authorization;

  const notion = await createClient(token);

  if (typeof notion === "undefined") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (req.method === "GET") {
    if (typeof req.query.databaseId !== "string")
      return res.status(400).json({ error: "Invalid requests" });

    const database_id = req.query.databaseId;

    try {
      await notion.databases.query({ database_id });
      return res.status(200).json({ message: "Success" });
    } catch (error: unknown) {
      if (isNotionClientError(error)) {
        switch (error.code) {
          case APIErrorCode.ObjectNotFound:
            return res.status(404).json({ message: "Database not found" });
          case APIErrorCode.Unauthorized:
            return res.status(401).json({ message: "Invalid credentials" });
          default:
            return res.status(401);
        }
      }
    }
  }

  if (req.method === "POST") {
    const { databaseId: database_id, data } = req.body;
    if (typeof database_id !== "string" || !(data instanceof Array<string>))
      return res.status(400).json("Invalid requests");
    try {
      const pageCreate = await notion.pages.create({
        parent: { type: "database_id", database_id },
        properties: {
          title: {
            title: [
              {
                type: "text",
                text: {
                  content: data[0],
                },
              },
            ],
          },
        },
        children: data.slice(1).map((text) => {
          return {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: text,
                  },
                },
              ],
            },
          };
        }),
      });
      return res.status(200).json({ message: "Uploaded Successfully" });
    } catch (error: unknown) {
      if (isNotionClientError(error)) {
        switch (error.code) {
          case APIErrorCode.ObjectNotFound:
            return res.status(404).json({ message: "Database not found" });
          case APIErrorCode.Unauthorized:
            return res.status(401).json({ message: "Invalid credentials" });
          default:
            return res.status(401);
        }
      }
    }
  }
};

export default notionAPI;
