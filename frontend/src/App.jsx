import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Sidebar from "./components/chat/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">

        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-gray-800 flex items-center justify-between px-4">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-xl"
          >
            ☰
          </button>

          <div className="font-semibold">
            🤖 RAG AI
          </div>

          <a
            href="/youtube"
            className="text-sm bg-gray-800 px-3 py-2 rounded-lg"
          >
            ▶ YouTube
          </a>

        </header>

        <div className="flex">

          {/* Sidebar */}
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* Main Pages */}
          <AppRoutes />

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;