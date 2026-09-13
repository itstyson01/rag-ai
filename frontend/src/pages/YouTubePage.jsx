import { useState } from "react";

import YouTubeHeader from "../components/youtube/YouTubeHeader";
import YouTubeUrlInput from "../components/youtube/YouTubeUrlInput";
import YouTubePlayer from "../components/youtube/YouTubePlayer";
import YouTubeChat from "../components/youtube/YouTubeChat";
import { processYouTubeVideo } from "../services/api";

function YouTubePage() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const processVideo = async () => {
    if (!url.trim()) return;

    setProcessing(true);
    setMessage("");

    try {
      const data = await processYouTubeVideo(url.trim());

      setVideoId(data.video_id);

      setMessage("Video processed successfully.");
    } catch (error) {
      console.error("YouTube processing error:", error);

      setMessage(
        error.message || "Failed to process YouTube video."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="flex-1 min-h-screen bg-gray-950 text-white p-4 md:p-6">

      <div className="max-w-6xl mx-auto">

        <YouTubeHeader />

        <YouTubeUrlInput
          url={url}
          setUrl={setUrl}
          onProcess={processVideo}
          processing={processing}
        />

        {message && (
          <div className="mt-4 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300">
            {message}
          </div>
        )}

        {videoId && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

            {/* LEFT SIDE */}
            <div className="space-y-4">

              <YouTubePlayer videoId={videoId} />

              {/* Video Description */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">

                <h2 className="text-lg font-semibold mb-2">
                  About this video
                </h2>

                <p className="text-sm text-gray-400 leading-6">
                  This video has been processed by the AI assistant.
                  You can watch the video above and ask questions about
                  its content using the AI chat.
                </p>

              </div>

            </div>

            {/* RIGHT SIDE - AI CHAT */}
            <div className="min-h-[500px]">
              <YouTubeChat videoId={videoId} />
            </div>

          </div>
        )}

      </div>

    </main>
  );
}

export default YouTubePage;