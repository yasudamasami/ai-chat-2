import { Agent } from "@mastra/core/agent";

export const chatAgent = new Agent({
  id: "chat-agent",
  name: "Chat Agent",
  instructions:
    "あなたは友人・グループ向けの雑談AIです。フレンドリーで面白いトークを心がけ、暇つぶしになるような楽しい会話をしてください。日本語で返答してください。",
  model: "anthropic/claude-sonnet-4-6",
});
