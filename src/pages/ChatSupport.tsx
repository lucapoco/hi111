import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import OpenAI from 'openai';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      sender: 'bot', 
      text: "Hello! I'm your AI recovery support assistant. I'm here to help you on your recovery journey. How can I assist you today?", 
      timestamp: new Date().toISOString() 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an empathetic and knowledgeable AI recovery support assistant. Your role is to:
              - Provide supportive, non-judgmental responses
              - Focus on evidence-based recovery strategies
              - Encourage seeking professional help when appropriate
              - Never give medical advice
              - Always maintain a compassionate tone
              - Keep responses concise but helpful
              - If someone is in crisis, direct them to emergency services or crisis hotlines`
          },
          {
            role: "user",
            content: inputMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      const botResponse: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: response.choices[0].message.content || "I apologize, but I'm having trouble responding right now. Please try again.",
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-t-xl shadow-md">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-xl">
            <h1 className="text-xl font-bold">AI Support Assistant</h1>
            <p className="text-sm opacity-90">Available 24/7 to provide guidance and support</p>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === 'user' ? 
                      <User className="w-4 h-4 mr-2" /> : 
                      <Bot className="w-4 h-4 mr-2" />
                    }
                    <span className="text-xs opacity-70">
                      {message.sender === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs mt-1 opacity-50 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-3 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <textarea
                className="flex-grow border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Type your message..."
                rows={2}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isTyping}
              />
              <button 
                className={`ml-2 bg-blue-600 text-white p-3 rounded-full transition-colors ${
                  isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
                onClick={handleSendMessage}
                disabled={isTyping}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              This AI assistant is for support only. If you're experiencing an emergency, please contact emergency services or call the National Helpline at 1-800-662-HELP (4357).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;