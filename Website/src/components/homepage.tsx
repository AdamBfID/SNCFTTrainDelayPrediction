import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Clock, TrendingUp, Shield, Zap, Train } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleTryFree = () => {
    navigate('/train-predictor');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <br /><br />
          
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Never Miss Your Train
            <span className="text-blue-600"> Again</span>
          </h2>
          
          <p className="text-xl text-white mb-8 leading-relaxed">
            SouthTrackAI is an intelligent train delay prediction platform that transforms your daily commute through the power of machine learning. By analyzing extensive historical data and real-time patterns, our advanced algorithms accurately forecast upcoming delays before they impact your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={handleTryFree}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Try SouthTrackAI Free
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
              <div className="text-gray-600">Prediction Accuracy</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">15min</div>
              <div className="text-gray-600">Average Time Saved</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Daily Predictions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className=" py-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">             
  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">               
    <div className="bg-blue-600 rounded-lg p-3 w-fit mb-4 mx-auto">                 
      <Brain className="h-6 w-6 text-white" />               
    </div>               
    <h4 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Predictions</h4>               
    <p className="text-gray-600">                 
      Advanced machine learning algorithms analyze vast datasets to predict delays with remarkable accuracy before they happen.               
    </p>             
  </div>              

  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">               
    <div className="bg-green-600 rounded-lg p-3 w-fit mb-4 mx-auto">                 
      <Clock className="h-6 w-6 text-white" />               
    </div>               
    <h4 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Alerts</h4>               
    <p className="text-gray-600">                 
      Get instant notifications about potential delays, giving you time to adjust your plans and find alternative routes.               
    </p>             
  </div>              

  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">               
    <div className="bg-purple-600 rounded-lg p-3 w-fit mb-4 mx-auto">                 
      <TrendingUp className="h-6 w-6 text-white" />               
    </div>               
    <h4 className="text-xl font-semibold text-gray-900 mb-3">Historical Analytics</h4>               
    <p className="text-gray-600">                 
      Explore comprehensive delay patterns and trends to optimize your travel schedule and route planning.               
    </p>             
  </div>
</div>
       
      </section>

      {/* CTA Section */}
      <section className="bg py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Commute?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of commuters who are already saving time with SouthTrackAI's intelligent delay predictions.
          </p>
          <button 
            onClick={handleTryFree}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            Start Predicting Delays Now
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;