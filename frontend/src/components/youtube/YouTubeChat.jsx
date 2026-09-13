import { useEffect, useRef, useState } from "react";

import { askYouTubeQuestion } from "../../services/api";

function YouTubeChat({ videoId }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [asking, setAsking] = useState(false);

  const messagesEndRef = useRef(null);

  // Automatically scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, asking]);

  const askQuestion = async (event) => {
    event.preventDefault();

    const currentQuestion = question.trim();

    if (!currentQuestion || !videoId || asking) return;

    // Clear input immediately
    setQuestion("");

    // Add user's question
    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    setAsking(true);

    try {
      const data = await askYouTubeQuestion(
        videoId,
        currentQuestion
      );

      // Add AI answer
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error("YouTube chat error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            error.message || "Failed to get answer.",
        },
      ]);
    } finally {
      setAsking(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col min-h-[500px]">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">
          Ask about this video
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Ask questions based on the video's transcript.
        </p>
      </div>

      {/* Scrollable Chat */}
      <div
        className="
          mt-5
          h-[360px]
          overflow-y-auto
          space-y-4
          pr-2
          scrollbar-thin
        "
      >

        {messages.length === 0 && !asking && (
          <div className="h-full flex items-center justify-center text-center text-gray-500 text-sm">
            Ask a question about the video.
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-950 border border-gray-800 text-gray-200"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {asking && (
          <div className="flex justify-start">
            <div className="bg-gray-950 border border-gray-800 text-gray-400 rounded-xl px-4 py-3 text-sm">
              Thinking...
            </div>
          </div>
        )}

        {/* Invisible element used for auto-scroll */}
        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <form
        onSubmit={askQuestion}
        className="flex gap-2 mt-4"
      >

        <input
          type="text"
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          placeholder="Ask a question..."
          className="flex-1 min-w-0 bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={asking || !question.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 rounded-xl"
        >
          {asking ? "..." : "Ask"}
        </button>

      </form>

    </div>
  );
}

export default YouTubeChat;