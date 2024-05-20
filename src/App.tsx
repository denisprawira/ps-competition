import { AnimatePresence } from 'framer-motion';
import './App.css';
import HomePage from './pages/Homepage';
import MainPage from './pages/MainPage';
import HomePageAdmin from './pages/HomepageAdmin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <AnimatePresence>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path={`/match`} element={<HomePage />} />
            <Route path={`/match/comp/admin`} element={<HomePageAdmin />} />
            <Route path={`*`} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AnimatePresence>
  );
}

export default App;
