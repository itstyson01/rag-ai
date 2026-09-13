function YouTubePlayer({ videoId }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

      <div className="aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

    </div>
  );
}

export default YouTubePlayer;