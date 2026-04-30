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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;

    const newUserMessage: Message = { sender: 'user', text: userPrompt };

    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setLoading(true);
    setError(null);

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      const formattedHistory = updatedMessages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      const response = await fetch(API_URL, {
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
        throw new Error('Failed to connect to the chatbot service.');
      }

      const data = await response.json();

      const botReplyText = data.reply || "I didn't quite get that.";

      const botMessage: Message = {
        sender: 'bot',
        text: botReplyText,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chatbot API Error:', err);
      setError(
        'Sorry, I encountered an error connecting to the AI. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
};