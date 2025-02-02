import { Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { IndexPage } from "./pages/IndexPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CreateGamePage } from "./pages/CreateGamePage";
import PrivateRoute from "./PrivateRoute";
import { MatchPage } from "./pages/MatchPage";
import { HomePage } from "./pages/HomePage";
import { StatisticsPage } from "./pages/StatisticsPages";
import ShowHistory from "./pages/ShowHistory";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<IndexPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="home"
            element={<PrivateRoute element={<HomePage />} />}
          />
          <Route path="create-game" element={<CreateGamePage />} />
          <Route path="matches/:id" element={<MatchPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="history" element={<PrivateRoute element={<ShowHistory />} />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
