// src/hooks/useChatbot.ts
import { useState } from 'react';

// Basic interface for a message
interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! I am the Ambalay Maps assistant. How can I help you build with location data today?' },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;

    // 1. Add user message to UI immediately
    const newUserMessage: Message = { sender: 'user', text: userPrompt };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setError(null);

    // 2. Prepare the request to Stephen's backend
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await fetch(`${API_URL}/chat`, { // Assuming Stephen's endpoint is '/chat'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth headers if Stephen requires them
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to the chatbot service.');
      }

      const data = await response.json();

      // Assuming Stephen returns JSON like: { "reply": "The response text..." }
      const botReplyText = data.reply || "I didn't quite get that.";
      const botMessage: Message = { sender: 'bot', text: botReplyText };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chatbot API Error:', err);
      setError('Sorry, I encountered an error connecting to the AI. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
};