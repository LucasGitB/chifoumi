import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CreateGamePage } from './pages/CreateGamePage';
import PrivateRoute from './PrivateRoute';
import { HomePage } from './pages/HomePage';
import { StatisticsPage } from './pages/StatisticsPages';
import ShowHistory from './pages/ShowHistory';
import { Route, Routes } from 'react-router-dom';
import { AuthenticatedLayout } from './layouts/AuthenticatedLayout';
import { RootLayout } from './layouts/RootLayout';
import { MatchPage } from './pages/MatchPage';
import { MatchResultsPage } from './pages/MatchResultsPage';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<IndexPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />

        <Route element={<PrivateRoute element={<AuthenticatedLayout />} />}>
          <Route path='home' element={<HomePage />} />
          <Route path='create-game' element={<CreateGamePage />} />
          <Route path='matches/:id/results' element={<MatchResultsPage />} />
          <Route path='matches/:id' element={<MatchPage />} />
          <Route path='statistics' element={<StatisticsPage />} />
          <Route path='history' element={<ShowHistory />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
