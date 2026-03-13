"use client";

import { useState } from "react";
import ChatWindow, { type Message } from "../components/Chat/ChatWindow";
import ChatInput, { type ImageAttachment } from "../components/Chat/ChatInput";

type ApiMessage =
  | { role: "user" | "assistant"; content: string }
  | {
      role: "user";
      content: Array<
        | { type: "text"; text: string }
        | { type: "image"; image: string; mimeType: string }
      >;
    };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string, image?: ImageAttachment) => {
    const userMessage: Message = {
      role: "user",
      content: text,
      imageUrl: image?.url,
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // APIへ送るメッセージ（画像がある場合はコンテンツを配列形式に変換）
      const apiMessages: ApiMessage[] = newMessages.map((msg, i) => {
        const isLastUserWithImage =
          i === newMessages.length - 1 && msg.role === "user" && msg.imageUrl;

        if (isLastUserWithImage) {
          return {
            role: "user" as const,
            content: [
              ...(msg.content ? [{ type: "text" as const, text: msg.content }] : []),
              {
                type: "image" as const,
                image: image!.data,
                mimeType: image!.mimeType,
              },
            ],
          };
        }

        // 過去の画像付きメッセージはテキスト部分のみ再送（履歴の軽量化）
        return { role: msg.role, content: msg.content };
      });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error("API error");

      const data = (await res.json()) as { message: string };
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "エラーが発生しました。もう一度お試しください。",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-dvh bg-gray-100 sm:p-4">
      <div className="flex flex-col w-full h-dvh sm:h-[min(calc(100dvh-2rem),800px)] sm:max-w-xl sm:rounded-2xl sm:shadow-2xl overflow-hidden bg-white">
        <header className="bg-white border-b border-gray-200 px-4 py-3 text-center shrink-0">
          <h1 className="text-base font-semibold text-gray-800">AI Chat</h1>
        </header>
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
