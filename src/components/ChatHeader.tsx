import Image from "next/image";

export default function ChatHeader() {
  return (
    <header
      id="chat-header"
      className="flex items-center gap-3 bg-wa-green-dark px-4 py-2.5 shadow-md"
    >
      {/* Avatar */}
      <Image
        src="/avatar.png"
        alt="Koala Virtual Bot"
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />

      {/* Name & status */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h1 className="truncate text-base font-medium text-white leading-tight">
          Koala Virtual Bot
        </h1>
        <span className="text-xs text-[#a8d8b9] leading-tight">en línea</span>
      </div>


    </header>
  );
}
