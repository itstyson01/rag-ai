import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ChatHeader from "../components/chat/ChatHeader";
import WelcomeMessage from "../components/chat/WelcomeMessage";
import PromptCard from "../components/chat/PromptCard";
import ChatInput from "../components/chat/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";

import { sendMessage } from "../services/api";

function ChatPage() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Automatically scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async (message, file = null) => {
    if (!message.trim() || loading) return;

    // Add user's message immediately
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        content: message,
      },
    ]);

    setLoading(true);

    try {
      const response = await sendMessage(
        message,
        file
      );

      // Add AI response
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: response.answer,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content:
            error.message || "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <main className="flex-1 min-h-[calc(100vh-4rem)] md:min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Header */}
      <ChatHeader />

      {/* Chat / Welcome Content */}
      <section className="flex-1 px-4 md:px-6 min-h-0">

        {!hasMessages ? (
          <div className="h-full flex flex-col items-center justify-center">

            <WelcomeMessage />

            {/* Prompt Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-10 max-w-2xl w-full">

              <PromptCard
                title="Explain RAG"
                description="Explain Retrieval Augmented Generation."
              />

              <PromptCard
                title="Learn FastAPI"
                description="Help me learn FastAPI with examples."
                mobile={false}
              />

              <PromptCard
                title="Summarize a document"
                description="Upload a document and summarize it."
                mobile={false}
              />

              <PromptCard
                title="YouTube AI"
                description="Ask questions about a YouTube video."
                onClick={() => navigate("/youtube")}
              />

            </div>

          </div>
        ) : (

          /* Scrollable Chat */
          <div
            className="
              max-w-5xl
              mx-auto
              h-[calc(100vh-190px)]
              overflow-y-auto
              py-6
              pr-2
              space-y-4
              scrollbar-hide
            "
          >

            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}

            {/* Loading */}
            {loading && (
              <MessageBubble
                role="assistant"
                content="Thinking..."
              />
            )}

            {/* Auto-scroll target */}
            <div ref={messagesEndRef} />

          </div>

        )}

      </section>

      {/* Chat Input */}
      <ChatInput onSend={handleSend} />

    </main>
  );
}

export default ChatPage;