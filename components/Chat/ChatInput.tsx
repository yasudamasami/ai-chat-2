"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import Image from "next/image";

export type ImageAttachment = {
  data: string;     // base64（プレフィックスなし）
  mimeType: string;
  url: string;      // data URL（プレビュー用）
};

type Props = {
  onSend: (message: string, image?: ImageAttachment) => void;
  isLoading: boolean;
};

export default function ChatInput({ onSend, isLoading }: Props) {
  const [input, setInput] = useState("");
  const [image, setImage] = useState<ImageAttachment | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if ((!trimmed && !image) || isLoading) return;
    onSend(trimmed, image ?? undefined);
    setInput("");
    setImage(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      const base64 = url.split(",")[1];
      setImage({ data: base64, mimeType: file.type, url });
    };
    reader.readAsDataURL(file);
    // 同じファイルを再選択できるようリセット
    e.target.value = "";
  };

  const canSend = (input.trim().length > 0 || image !== null) && !isLoading;

  return (
    <div className="px-3 py-3 border-t border-gray-200 bg-white shrink-0">
      {/* 画像プレビュー */}
      {image && (
        <div className="mb-2 ml-1 relative inline-block">
          <Image
            src={image.url}
            alt="添付画像プレビュー"
            width={72}
            height={72}
            className="w-18 h-18 object-cover rounded-xl border border-gray-200"
            unoptimized
          />
          <button
            onClick={() => setImage(null)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-600 text-white text-xs flex items-center justify-center hover:bg-gray-800"
            aria-label="画像を削除"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* 画像添付ボタン */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          aria-label="画像を添付"
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-gray-500 hover:bg-gray-100 disabled:opacity-40 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInputResize}
          placeholder="メッセージを入力…"
          rows={1}
          disabled={isLoading}
          className="flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-2.5 text-sm leading-relaxed text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 bg-gray-50 max-h-[120px] overflow-y-auto transition-colors disabled:opacity-60 placeholder:text-gray-400"
        />

        {/* 送信ボタン */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="送信"
          className={`
            w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-150
            ${canSend
              ? "bg-indigo-500 text-white shadow-md hover:bg-indigo-600 active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>

      <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
        Ctrl + Enter で送信　Enter / Shift + Enter で改行
      </p>
    </div>
  );
}
