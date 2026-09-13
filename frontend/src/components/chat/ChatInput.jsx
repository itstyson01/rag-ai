import { useRef, useState } from "react";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    onSend(message, selectedFile);

    setMessage("");
    setSelectedFile(null);
    setShowOptions(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setShowOptions(false);

    // Allow selecting the same file again later
    event.target.value = "";
  };

  return (
    <div className="border-t border-gray-800 p-3 md:p-4">

      <div className="max-w-3xl mx-auto relative">

        {/* Upload Menu */}
        {showOptions && (
          <div className="absolute bottom-16 left-0 z-50 bg-gray-900 border border-gray-700 rounded-xl p-2 shadow-xl">

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-800 text-sm whitespace-nowrap"
            >
              📄 Upload PDF
            </button>

          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Selected File */}
        {selectedFile && (
          <div className="mb-2 flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg px-3 py-2">

            <div className="flex items-center gap-2 min-w-0">
              <span>📄</span>

              <span className="text-sm text-gray-300 truncate">
                {selectedFile.name}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-white ml-3"
            >
              ✕
            </button>

          </div>
        )}

        {/* Chat Form */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 md:gap-3"
        >

          {/* Add Button */}
          <button
            type="button"
            onClick={() => setShowOptions((previous) => !previous)}
            className="w-11 h-11 shrink-0 bg-gray-900 border border-gray-700 rounded-xl hover:bg-gray-800 flex items-center justify-center text-xl"
          >
            +
          </button>

          {/* Message Input */}
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={
              selectedFile
                ? "Ask something about this PDF..."
                : "Message your AI assistant..."
            }
            className="flex-1 min-w-0 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 md:px-5 h-11 rounded-xl"
          >
            Send
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChatInput;