from youtube_transcript_api import YouTubeTranscriptApi


def get_video_id(url: str):

    if "youtu.be/" in url:
        return url.split("youtu.be/")[1].split("?")[0]

    if "youtube.com/watch?v=" in url:
        return url.split("v=")[1].split("&")[0]

    raise ValueError("Invalid YouTube URL")


def get_transcript(url: str):

    video_id = get_video_id(url)

    api = YouTubeTranscriptApi()

    transcript_list = api.list(video_id)

    # Prefer English
    try:
        transcript = transcript_list.find_transcript(["en"])
    except Exception:

        # Try Hindi if English is unavailable
        try:
            transcript = transcript_list.find_transcript(["hi"])
        except Exception:
            raise ValueError(
                "No English or Hindi transcript is available for this video."
            )

    fetched_transcript = transcript.fetch()

    text = " ".join(
        snippet.text
        for snippet in fetched_transcript
    )

    return text