import { Link } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky
          top-0 left-0
          z-50
          w-64
          h-screen
          bg-gray-900
          text-white
          p-5
          flex flex-col
          transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="text-xl font-bold"
          >
            🤖 RAG AI
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400"
          >
            ✕
          </button>
        </div>

        {/* New Chat */}
        <Link
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-center mb-6"
        >
          + New Chat
        </Link>

        {/* Desktop Chat History */}
        <div className="flex-1 hidden md:block">
          <h2 className="text-sm text-gray-400 mb-3">Chat History</h2>

          <div className="space-y-2">
            <button className="w-full text-left p-2 rounded-lg hover:bg-gray-800">
              💬 Python Learning
            </button>

            <button className="w-full text-left p-2 rounded-lg hover:bg-gray-800">
              💬 FastAPI Project
            </button>

            <button className="w-full text-left p-2 rounded-lg hover:bg-gray-800">
              💬 Explain RAG
            </button>
          </div>
        </div>

        {/* YouTube AI */}
        <Link
          to="/youtube"
          onClick={() => setSidebarOpen(false)}
          className="w-full p-3 mb-2 rounded-lg bg-gray-800 hover:bg-gray-700"
        >
          ▶️ YouTube AI
        </Link>

        {/* Settings */}
        <Link
          to="/settings"
          onClick={() => setSidebarOpen(false)}
          className="w-full p-3 rounded-lg hover:bg-gray-800"
        >
          ⚙️ Settings
        </Link>
      </aside>
    </>
  );
}

export default Sidebar;
