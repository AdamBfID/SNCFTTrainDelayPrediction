import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/homepage';
import TrainDelayPredictor from './components/TrainPrediction';
import DarkVeil from './components/DarkVeil';
import ProfileCard from './components/ProfileCard';
import Chatbot from './components/Chatbot';
import Mepic from './assets/MEpic.png';
import karim from './assets/karim.png';

function App() {
  // Handler for contact button clicks
  const handleContactClick = () => {
    console.log('Contact clicked');
  };

  // Profile card configuration
  const profileCardProps = {
    name: "Adam Boufeid",
    title: "Applied Mathematics and Modeling Engineer",
    handle: "Adam boufeid",
    status: "Online",
    contactText: "Contact Me",
    avatarUrl: Mepic,
    showUserInfo: true,
    enableTilt: true,
    onContactClick: handleContactClick
  };

  const profileCardProps2 = {
    name: "Karim Maktouf",
    title: "Data Scientist",
    handle: "karim",
    status: "Online",
    contactText: "Contact Me",
    avatarUrl: karim,
    showUserInfo: true,
    enableTilt: true,
    onContactClick: handleContactClick
  };

  return (
    <Router>
      <div className="app-container">
        {/* Background Layer */}
        <div className="background-layer">
          <DarkVeil />
        </div>

        {/* Header - Always visible */}
        <Header />

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <HomePage />
                {/* Profile Cards Section - Improved Aesthetics */}
                <section className="py-16 ">
                  <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center text-white mb-9 drop-shadow-sm">Who are we?</h2>
                    <br /><br />
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                      <ProfileCard {...profileCardProps} />
                      <ProfileCard {...profileCardProps2} />
                    </div>
                  </div>
                </section>
              </>
            } />
            <Route path="/train-predictor" element={<TrainDelayPredictor />} />
          </Routes>
        </div>

        {/* Fixed Chatbot in Bottom Right */}
        <div className="chatbot-container">
          <Chatbot />
        </div>
      </div>
    </Router>
  );
}

export default App;