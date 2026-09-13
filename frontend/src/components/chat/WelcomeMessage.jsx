function WelcomeMessage() {
  return (
    <div className="text-center max-w-xl">
      
      <div className="text-4xl md:text-5xl mb-4 md:mb-5">
        🤖
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">
        How can I help you today?
      </h2>

      <p className="text-sm md:text-base text-gray-400">
        Ask questions, upload documents, search the web,
        or learn something new.
      </p>

    </div>
  );
}

export default WelcomeMessage;