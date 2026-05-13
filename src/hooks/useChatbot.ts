import { useState } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! I am the Ambalay Maps assistant. How can I help you build with location data today?',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      text: userPrompt,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      // console.log(API_URL)

      const formattedHistory = updatedMessages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        text: msg.text,
      }));

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userPrompt,
          conversationHistory: formattedHistory,
        }),
      });


      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log('Chatbot Response:', data);

      const botMessage: Message = {
        sender: 'bot',
        text:
          data.reply ||
          data.response ||
          data.message ||
          'Sorry, I could not understand that.',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chatbot API Error:', err);

      setError('Error connecting to AI service.');

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sorry, something went wrong while connecting to the assistant.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
};