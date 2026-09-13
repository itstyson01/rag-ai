function PromptCard({ title, description, onClick, mobile = true }) {
  return (
    <button
      onClick={onClick}
      className={`
        border border-gray-800
        rounded-xl
        p-4
        text-left
        hover:bg-gray-900
        transition
        ${mobile ? "" : "hidden md:block"}
      `}
    >
      <h3 className="font-medium">
        {title}
      </h3>

      <p className="text-sm text-gray-400 mt-1">
        {description}
      </p>
    </button>
  );
}

export default PromptCard;