function ChatHeader() {
  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-4 md:px-6">

      <h1 className="text-lg font-semibold">
        AI Assistant
      </h1>

      <button className="border border-gray-700 px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800">
        New Chat
      </button>

    </header>
  );
}

export default ChatHeader;