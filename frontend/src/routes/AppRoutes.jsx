import { Routes, Route } from "react-router-dom";

import ChatPage from "../pages/ChatPage";
import YouTubePage from "../pages/YouTubePage";
import SettingsPage from "../pages/SettingsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/youtube" element={<YouTubePage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}

export default AppRoutes;