import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface TrainSchedule {
  trainNumber: string;
  circulationDays: string;
  stations: { [key: string]: string };
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trainData, setTrainData] = useState<TrainSchedule[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // SNCFT information
  const sncftInfo = {
    fullName: "Société Nationale des Chemins de Fer Tunisiens",
    englishName: "Tunisian National Railway Company",
    abbreviation: "SNCFT",
    founded: "December 27, 1956",
    headquarters: "Tunis",
    employees: "about 6000 people",
    trackGauge: {
      standard: "471 km of 1,435 mm (4 ft 8+1⁄2 in) standard gauge network in the northern",
      metre: "1,674 km of 1,000 mm (3 ft 3+3⁄8 in) metre gauge network in the central and southern part",
      electrified: "65 km electrified",
      dual: "8 km dual gauge track"
    },
    services: "passenger and freight services at a national level",
    algeriaLink: "rail link with neighbouring Algeria via the border at Ghardimaou",
    algeriaService: "Passenger service restored in August 2024, trains running three times per week"
  };

  // CSV data
  const csvData = `Jours de Circulation,Numéro Train,ERRIADH ,BORJ CEDRIA ,BIR BEY ,HAMMAM CHATT,TAHAR SFAR,ARRET DU STADE ,HAMMAM LIF,BOUKORNINE,LYCEE EZZAHRA,EZ-ZAHRA,RADES MELIANE,RADES,LYCEE RADES ,SIDI REZIG ,MEGRINE,MEGRINE RYADH,JEBEL JELLOUD,TUNIS VILLE
D,102,4:30,4:35,4:38,4:40,4:43,4:45,4:48,4:51,4:53,4:55,4:58,5:01,,5:05,5:08,5:10,5:12,5:21
A,104,4:50,4:55,4:58,5:00,5:03,5:05,5:08,5:11,5:13,5:15,5:18,5:21,,5:25,5:28,5:30,5:32,5:41
B,106,5:00,5:05,5:08,5:10,5:13,5:15,5:18,5:21,5:23,5:25,5:28,5:31,,5:35,5:38,5:40,5:42,5:51
A,108,5:10,5:15,5:18,5:20,5:23,5:25,5:28,5:31,5:33,5:35,5:38,5:41,,5:45,5:48,5:50,5:52,6:01
D,110,5:35,5:40,5:43,5:45,5:48,5:50,5:53,5:56,5:58,6:00,6:03,6:06,,6:10,6:13,6:15,6:17,6:26
A,114,5:55,6:00,6:03,6:05,6:08,6:10,6:13,6:16,6:18,6:20,6:23,6:26,6:28,6:31,6:33,6:35,6:38,6:46
B,116,6:00,6:05,6:08,6:09,6:11,6:14,6:17,6:19,6:21,6:24,6:27,6:30,6:32,6:34,6:37,6:39,6:41,6:50
A,118,6:10,6:15,6:18,6:19,6:21,6:23,6:26,6:28,6:30,6:32,6:34,6:37,,,,,,6:52
A,120,6:25,6:30,6:33,6:35,6:38,6:40,6:43,6:46,6:48,6:50,6:53,6:56,6:58,7:01,7:03,7:05,7:08,7:16
B,122,6:30,6:35,6:38,6:40,6:43,6:45,6:48,6:51,6:53,6:55,6:58,7:01,7:03,7:06,7:08,7:10,7:13,7:21
A,124,6:40,6:45,6:48,6:50,6:52,6:55,6:58,7:00,7:02,7:05,7:08,7:11,7:13,7:15,7:17,7:19,7:22,7:30
C,126,6:55,7:00,7:03,7:05,7:08,7:10,7:13,,,7:18,,7:23,,,,,,7:38
B,128,7:00,7:05,7:09,7:11,7:13,7:16,7:19,7:21,7:23,7:26,7:29,7:32,7:35,7:37,7:40,7:42,7:45,7:53
A,130,7:05,7:10,7:13,7:15,7:17,7:20,7:23,7:25,7:27,7:30,7:33,7:36,7:38,7:41,7:43,7:45,7:48,7:56
A,132,,,,,,,7:35,7:37,7:39,7:42,7:45,7:48,7:50,7:53,7:55,7:57,7:59,8:07
D,136,7:30,7:35,7:39,7:41,7:43,7:45,7:48,7:50,7:52,7:55,7:58,8:01,8:03,8:06,8:08,8:10,8:13,8:21
A,138,7:50,7:55,7:58,8:00,8:03,8:05,8:08,8:11,8:13,8:15,8:18,8:21,8:23,8:26,8:28,8:30,8:33,8:41
B,140,8:00,8:05,8:08,8:10,8:13,8:15,8:18,8:21,8:23,8:25,8:28,8:31,8:33,8:36,8:38,8:40,8:43,8:51
A,142,8:10,8:15,8:18,8:20,8:23,8:25,8:28,8:31,8:33,8:35,8:38,8:41,8:43,8:46,8:48,8:50,8:53,9:01
D,146,8:30,8:35,8:38,8:40,8:42,8:45,8:48,8:50,8:52,8:55,8:58,9:01,9:03,9:05,9:08,9:10,9:12,9:20
D,148,9:00,9:05,9:08,9:10,9:13,9:15,9:18,9:21,9:23,9:25,9:28,9:31,9:34,9:36,9:39,9:41,9:43,9:51
A,150,9:15,9:20,9:23,9:25,9:28,9:30,9:33,9:36,9:38,9:40,9:43,9:46,9:48,9:51,9:53,9:55,9:58,10:06
D,152,9:30,9:35,9:38,9:40,9:43,9:45,9:48,9:51,9:53,9:55,9:58,10:01,10:03,10:06,10:08,10:10,10:13,10:21
D,154,10:00,10:05,10:08,10:10,10:13,10:15,10:18,10:21,10:23,10:25,10:28,10:31,10:33,10:36,10:38,10:40,10:43,10:51
D,156,10:30,10:35,10:38,10:40,10:43,10:45,10:48,10:51,10:53,10:55,10:58,11:01,11:03,11:06,11:08,11:10,11:13,11:21
D,158,11:00,11:05,11:08,11:10,11:13,11:15,11:18,11:21,11:23,11:25,11:28,11:31,11:33,11:36,11:38,11:40,11:42,11:50
D,160,11:30,11:35,11:38,11:40,11:43,11:45,11:48,11:51,11:53,11:55,11:58,12:01,12:03,12:06,12:08,12:10,,12:20
D,164,12:00,12:05,12:08,12:10,12:12,12:14,12:17,12:19,12:21,12:23,12:26,12:29,12:31,12:33,12:36,12:37,12:39,12:48
D,168,12:30,12:35,12:38,12:40,12:43,12:45,12:48,12:51,12:53,12:55,12:58,13:01,13:03,13:06,13:08,13:10,13:13,13:21
D,172,13:00,13:05,13:08,13:10,13:13,13:15,13:18,13:21,13:23,13:25,13:28,13:31,13:34,13:36,13:39,13:41,13:43,13:51
D,176,13:30,13:35,13:38,13:40,13:43,13:45,13:48,13:51,13:53,13:55,13:58,14:01,14:03,14:06,14:08,14:10,14:13,14:21
C,178,13:45,13:50,13:53,13:55,13:58,14:00,14:03,14:06,14:08,14:10,14:13,14:16,14:18,14:21,14:23,14:25,14:27,14:36
D,184,14:00,14:05,14:08,14:10,14:13,14:15,14:18,14:21,14:23,14:25,14:28,14:31,14:33,14:36,14:38,14:40,14:42,14:50
C,186,14:20,14:25,14:28,14:30,14:33,14:35,14:38,14:41,14:43,14:45,14:48,14:51,14:53,14:56,14:58,15:00,15:02,15:10
D,190,14:30,14:35,14:38,14:40,14:43,14:45,14:48,14:51,14:53,15:01,15:03,15:06,15:08,15:10,15:13,15:21
D,194,15:00,15:05,15:08,15:10,15:13,15:15,15:18,15:21,15:23,15:25,15:28,15:31,,15:34,15:36,15:39,15:41,15:43,15:51
D,198,15:30,15:35,15:38,15:40,15:43,15:45,15:48,15:51,15:53,15:55,15:58,16:01,16:03,16:06,16:08,16:10,16:13,16:21
D,206,16:00,16:05,16:08,16:10,16:13,16:15,16:18,16:21,16:23,16:25,16:28,16:31,,16:34,16:36,16:38,16:40,16:43,16:51
C,208,,,,,,,16:25,16:27,16:29,16:31,16:34,16:38,16:40,16:42,16:44,16:45,16:48,16:56
C,210,16:20,16:25,16:28,16:29,16:31,16:33,16:36,,,16:41,,16:46,,,,,,17:01
D,212,16:30,16:35,16:38,16:40,16:43,16:45,16:48,16:51,16:53,16:55,16:58,17:01,17:03,17:06,17:08,17:10,17:13,17:21
D,216,17:00,17:05,17:08,17:10,17:13,17:15,17:18,17:21,17:23,17:25,17:28,17:31,17:33,17:36,17:38,17:40,17:43,17:51
D,220,17:30,17:35,17:38,17:40,17:43,17:45,17:48,17:51,17:53,17:55,17:58,18:01,18:03,18:06,18:08,18:10,18:13,18:21
C,222,17:55,18:00,18:03,18:04,18:06,18:08,18:11,,,,,18:16,,18:21,,,,18:36
D,228,18:05,18:10,18:13,18:15,18:18,18:20,18:23,18:26,18:28,18:30,18:33,18:36,18:38,18:41,18:43,18:45,18:48,18:56
D,230,18:30,18:35,18:38,18:40,18:43,18:45,18:48,18:51,18:53,18:55,18:58,19:01,19:03,19:06,19:08,19:10,19:13,19:21
D,234,19:00,19:05,19:08,19:10,19:13,19:15,19:18,19:21,19:23,19:25,19:28,19:31,19:33,19:36,19:38,19:40,19:43,19:51
D,236,19:30,19:35,19:38,19:40,19:43,19:45,19:48,19:51,19:53,19:55,19:58,20:01,,20:05,20:08,20:10,,20:20
D,240,20:00,20:05,20:08,20:10,20:13,20:15,20:18,20:21,20:23,20:25,20:28,20:31,,20:35,20:38,20:40,,20:50
D,242,20:30,20:35,20:38,20:40,20:42,20:44,20:47,20:49,20:51,20:53,20:57,21:00,,21:04,21:06,21:08,,21:18
D,246,21:15,21:20,21:23,21:25,21:27,21:29,21:32,21:34,21:36,21:38,21:42,21:45,,21:49,21:51,21:53,,22:03
D,250,22:00,22:05,22:08,22:10,22:12,22:14,22:17,22:19,22:21,22:23,22:27,22:30,,22:34,22:36,22:38,22:41,22:49`;

  // Parse CSV data
  useEffect(() => {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const parsedData: TrainSchedule[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const stations: { [key: string]: string } = {};
      
      for (let j = 2; j < headers.length; j++) {
        const stationName = headers[j].trim();
        const time = values[j] ? values[j].trim() : '';
        if (time) {
          stations[stationName] = time;
        }
      }

      parsedData.push({
        circulationDays: values[0],
        trainNumber: values[1],
        stations
      });
    }

    setTrainData(parsedData);
  }, []);

  // Scroll to the bottom of the chat on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Call Gemini API directly from frontend
  const callGeminiApi = async (prompt: string): Promise<string> => {
    try {
      // You'll need to replace 'YOUR_API_KEY' with your actual Gemini API key
      // Note: In production, you should use environment variables and proper security measures
      const API_KEY = 'xxxxx'; // Replace with your actual API key
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error: any) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to get response from AI. Please check your API key and try again.');
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = { text: inputValue, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    const userQuery = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await processQuery(userQuery);
      const newBotMessage: Message = { text: botResponse, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error('Error processing query:', error);
      const errorMessage: Message = { text: 'Oops! Something went wrong. Please try again or check your API key configuration.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const processQuery = async (query: string): Promise<string> => {
    // Prepare context for Gemini from SNCFT info
    const sncftContext = `SNCFT (Société Nationale des Chemins de Fer Tunisiens) is the Tunisian National Railway Company. 
    It was founded on ${sncftInfo.founded}. Its headquarters are in ${sncftInfo.headquarters} and it employs ${sncftInfo.employees}.
    SNCFT manages a standard gauge network of ${sncftInfo.trackGauge.standard} and a metre gauge network of ${sncftInfo.trackGauge.metre}. 
    ${sncftInfo.trackGauge.electrified} and ${sncftInfo.trackGauge.dual}. 
    It provides ${sncftInfo.services}. 
    There is a ${sncftInfo.algeriaLink}. ${sncftInfo.algeriaService}.`;

    // Prepare context for Gemini from train schedule data
    let trainScheduleContext = "Here is the train schedule data:\n";
    trainData.forEach(train => {
      trainScheduleContext += `Train Number: ${train.trainNumber}, Circulation Days: ${train.circulationDays}, Stations: `;
      Object.entries(train.stations).forEach(([station, time]) => {
        trainScheduleContext += `${station} at ${time}; `;
      });
      trainScheduleContext += "\n";
    });

    // Construct the full prompt to send to Gemini
    const fullPrompt = `You are a helpful chatbot providing information ONLY about SNCFT (Société Nationale des Chemins de Fer Tunisiens) and its train schedules. 
    Do not answer questions outside of this domain. If a question is outside this domain, respond with "I can only provide information about SNCFT and its train schedules."
    
    Here is the relevant information about SNCFT:
    ${sncftContext}

    Here is the train schedule data (format: Station: Time):
    ${trainScheduleContext}

    Based on the above information, please answer the following question:
    User Query: "${query}"`;

    try {
      const geminiResponse = await callGeminiApi(fullPrompt);
      
      // Basic check to prevent out-of-scope answers
      if (geminiResponse.toLowerCase().includes("i can only provide information about sncft and its train schedules")) {
        return "I can only provide information about SNCFT and its train schedules.";
      }

      return geminiResponse;
    } catch (error) {
      console.error("Error with Gemini API call:", error);
      return "I'm sorry, I couldn't retrieve the information at this moment. Please check your API key and try again.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 fixed bottom-8 right-8 shadow-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          🚂
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-8 right-8 w-[400px] h-[600px] flex flex-col border border-gray-300 shadow-xl bg-white text-black">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 bg-blue-50">
            <div>
              <CardTitle className="text-lg font-semibold text-blue-800">SNCFT Assistant</CardTitle>
              <p className="text-sm text-blue-600">Train schedules & railway info</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-500 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </CardHeader>
          <CardContent className="flex-grow p-4 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 italic mt-8">
                  <p className="mb-4">👋 Welcome to SNCFT Assistant!</p>
                  <p className="text-sm">Ask me about train schedules, station information, or SNCFT railway company details.</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-black border border-gray-200'
                      }`}
                    >
                      <pre className="whitespace-pre-wrap text-sm font-sans">{msg.text}</pre>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start mb-3">
                  <div className="max-w-[85%] p-3 rounded-lg bg-gray-100 text-gray-500 italic border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span>Searching...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t border-gray-200">
            <div className="flex w-full space-x-2">
              <Input
                placeholder="Ask about trains, stations, or SNCFT..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow border border-gray-300 focus:border-blue-500 focus:ring-0"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading} 
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};


export default Chatbot;
