import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Clock, Train, MapPin, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import trainlogo from '../assets/trainlogo (2).png'

// Sample stations based on your data
const stations = ['ERRIADH', 'BORJ CEDRIA', 'BIR BEY', 'HAMMAM CHATT', 'TAHAR SFAR', 'ARRET DU STADE', 'HAMMAM LIF', 'BOUKORNINE', 'LYCEE EZZAHRA', 'EZ-ZAHRA', 'RADES MELIANE', 'RADES', 'LYCEE RADES', 'SIDI REZIG', 'MEGRINE', 'MEGRINE RYADH', 'JEBEL JELLOUD', 'TUNIS VILLE']

// Sample train data structure
interface TrainPrediction {
  train_id: number;
  scheduled_arrival: string;
  predicted_arrival_delay: number;
  confidence: number;
  delay_probability: number;
}

const TrainArrivalPredictor: React.FC = () => {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<TrainPrediction[]>([]);
  const [error, setError] = useState('');

  // Simulate AI prediction API call
  const simulateAIPrediction = async (departure: string, arrival: string): Promise<TrainPrediction[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const currentTime = new Date();
    const mockPredictions: TrainPrediction[] = [];
    
    // Generate 3-5 upcoming trains
    for (let i = 0; i < Math.floor(Math.random() * 3) + 3; i++) {
      const arrivalTime = new Date(currentTime);
      arrivalTime.setMinutes(arrivalTime.getMinutes() + (i * 30) + Math.floor(Math.random() * 20));
      
      // Simulate AI predictions with realistic delay patterns
      const arrivalDelay = (Math.random() - 0.5) * 10; // -5 to +5 minutes
      const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence
      const delayProbability = Math.abs(arrivalDelay) > 2 ? Math.random() * 0.4 + 0.6 : Math.random() * 0.4 + 0.1;
      
      mockPredictions.push({
        train_id: 100 + i,
        scheduled_arrival: arrivalTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        predicted_arrival_delay: Math.round(arrivalDelay * 10) / 10,
        confidence: Math.round(confidence * 100),
        delay_probability: Math.round(delayProbability * 100)
      });
    }
    
    return mockPredictions;
  };

  const handlePredict = async () => {
    if (!departureCity || !arrivalCity) {
      setError('Please select both departure and arrival cities');
      return;
    }
    
    if (departureCity === arrivalCity) {
      setError('Departure and arrival cities must be different');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const results = await simulateAIPrediction(departureCity, arrivalCity);
      setPredictions(results);
    } catch (err) {
      setError('Failed to get predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDelayStatusColor = (delay: number) => {
    if (delay <= -1) return 'bg-green-100 text-green-800';
    if (delay <= 2) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getDelayStatusIcon = (delay: number) => {
    if (delay <= -1) return <CheckCircle className="w-4 h-4" />;
    if (delay <= 2) return <Clock className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  const formatDelay = (delay: number) => {
    if (delay === 0) return 'On Time';
    if (delay > 0) return `+${delay} min`;
    return `${delay} min`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className='bg-neutral-300'>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Train className="w-8 h-8 text-blue-600" />
            Train Arrival Predictor
          </CardTitle>
          <CardDescription>
            Get real-time predictions for train arrival delays using advanced AI trained on historical data
          </CardDescription>
          <img src = {trainlogo}/>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departure">Departure City</Label>
              <select
                id="departure"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
              >
                <option value="">Select departure city</option>
                {stations.map(station => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="arrival">Arrival City</Label>
              <select
                id="arrival"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
              >
                <option value="">Select arrival city</option>
                {stations.map(station => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>
            </div>
          </div>
          
          {error && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button 
            onClick={handlePredict} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Train className="mr-2 h-4 w-4" />
                Predict Arrival Delays
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {predictions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Upcoming Arrivals: {departureCity} → {arrivalCity}
            </CardTitle>
            <CardDescription>
              AI predictions based on historical data analysis
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {predictions.map((train) => (
                <div key={train.train_id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Train className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold">Train {train.train_id}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Scheduled Arrival: {train.scheduled_arrival}
                      </div>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className="bg-blue-50 text-blue-700"
                    >
                      {train.confidence}% Confidence
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Arrival Delay</Label>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getDelayStatusColor(train.predicted_arrival_delay)}`}>
                        {getDelayStatusIcon(train.predicted_arrival_delay)}
                        <span className="text-sm font-medium">
                          {formatDelay(train.predicted_arrival_delay)}
                        </span>
                      </div>
                    </div>
                    
                    
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainArrivalPredictor;