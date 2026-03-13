import { Hono } from "hono";
import { cors } from "hono/cors";
import type { CoreMessage } from "@mastra/core/llm";
import { chatAgent } from "../mastra/agent";

const app = new Hono().basePath("/api");

app.use("*", cors());

app.post("/chat", async (c) => {
  const body = await c.req.json<{ messages: CoreMessage[] }>();
  const { messages } = body;

  if (!messages || messages.length === 0) {
    return c.json({ error: "messages is required" }, 400);
  }

  const response = await chatAgent.generate(messages);

  return c.json({ message: response.text });
});

export default app;
