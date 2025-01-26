import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CreateGamePage } from "./pages/CreateGamePage";
import { LobbyPage } from "./pages/LobbyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="lobby" element={<LobbyPage />} />
          <Route path="create-game" element={<CreateGamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
