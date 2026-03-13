"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export type Message = {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string; // data URL (ユーザーメッセージの添付画像)
};

type Props = {
  messages: Message[];
  isLoading: boolean;
};

export default function ChatWindow({ messages, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 overscroll-contain">
      {messages.length === 0 && !isLoading && (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-400 text-sm text-center leading-relaxed">
            こんにちは！<br />何でも気軽に話しかけてみて 💬
          </p>
        </div>
      )}

      {messages.map((msg, i) => (
        <MessageBubble
          key={i}
          role={msg.role}
          content={msg.content}
          imageUrl={msg.imageUrl}
        />
      ))}

      {isLoading && (
        <div className="flex items-end gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            AI
          </div>
          <div className="bg-gray-100 rounded-t-2xl rounded-br-2xl rounded-bl px-4 py-3 shadow-sm">
            <span className="flex gap-1 items-center h-4">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
