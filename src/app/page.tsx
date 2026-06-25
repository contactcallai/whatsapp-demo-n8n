import ChatClient from "@/components/ChatClient";

export default function Home() {
  return (
    <main className="flex h-dvh items-center justify-center bg-[#dfe5e7]">
      <div className="flex h-full w-full max-w-[1600px] flex-col shadow-xl">
        <ChatClient />
      </div>
    </main>
  );
}
