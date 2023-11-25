import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Heroes from './pages/main/Heroes';
import About from './pages/About';
import SplashScreen from "./pages/SplashScreen";
import "./App.css";
import HeroDetail from './pages/details/HeroDetail';
import Teams from './pages/main/Teams';
import Player from './pages/details/Player';

function App() {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isSplashScreenVisible ? (
        <SplashScreen />
      ) : (
        <>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Heroes />} />
              <Route path="/profile" element={<About />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/detail/:id" element={<HeroDetail />} />
              <Route path="/player/:id" element={<Player />} />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;