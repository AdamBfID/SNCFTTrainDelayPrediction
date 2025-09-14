import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Train } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/train-predictor');
  };

  return (
    <header className="backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <Train className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">SouthTrackAI</h1>
          </Link>
          
         
          
          <button 
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;