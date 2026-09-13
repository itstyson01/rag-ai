const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";


// ==============================
// Normal AI Chat
// ==============================

export async function sendMessage(message, file = null) {
  const formData = new FormData();

  formData.append("question", message);

  if (file) {
    formData.append("file", file);
  }

  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail?.[0]?.msg ||
      data.detail ||
      "Failed to send message"
    );
  }

  return data;
}


// ==============================
// YouTube Processing
// ==============================

export async function processYouTubeVideo(url) {
  const response = await fetch(
    `${API_URL}/youtube/process`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail?.[0]?.msg ||
      data.detail ||
      "Failed to process YouTube video"
    );
  }

  return data;
}


// ==============================
// YouTube AI Chat
// ==============================

export async function askYouTubeQuestion(
  videoId,
  message
) {
  const response = await fetch(
    `${API_URL}/youtube/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
        video_id: videoId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail?.[0]?.msg ||
      data.detail ||
      "Failed to get YouTube answer"
    );
  }

  return data;
}