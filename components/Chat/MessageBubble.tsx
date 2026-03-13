import Image from "next/image";

type Props = {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
};

export default function MessageBubble({ role, content, imageUrl }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* アバター */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
          AI
        </div>
      )}

      {/* バブル */}
      <div
        className={`
          relative max-w-[72%] text-sm leading-relaxed shadow-sm overflow-hidden
          ${isUser
            ? "bg-indigo-500 text-white rounded-t-2xl rounded-bl-2xl rounded-br"
            : "bg-gray-100 text-gray-800 rounded-t-2xl rounded-br-2xl rounded-bl"
          }
        `}
      >
        {/* 画像 */}
        {imageUrl && (
          <div className="relative w-full max-w-[240px]">
            <Image
              src={imageUrl}
              alt="添付画像"
              width={240}
              height={240}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>
        )}
        {/* テキスト */}
        {content && (
          <p className="px-3.5 py-2.5 whitespace-pre-wrap break-words">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}
