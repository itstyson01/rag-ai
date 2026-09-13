function YouTubeUrlInput({
  url,
  setUrl,
  onProcess,
  processing,
}) {
  return (
    <div className="mt-6 flex flex-col md:flex-row gap-3">

      <input
        type="text"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="Paste YouTube URL..."
        className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      />

      <button
        onClick={onProcess}
        disabled={processing || !url.trim()}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded-xl"
      >
        {processing ? "Processing..." : "Process Video"}
      </button>

    </div>
  );
}

export default YouTubeUrlInput;