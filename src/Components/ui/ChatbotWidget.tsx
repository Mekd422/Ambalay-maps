import React, { useState, useRef, useEffect } from 'react'
import { useChatbot } from '../../hooks/useChatbot'

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, loading, sendMessage } = useChatbot()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    const currentMsg = input
    setInput('')
    await sendMessage(currentMsg)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#0a0a0a] sm:w-[400px]">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 p-4 dark:border-white/5 dark:from-[#0a0a0a] dark:to-[#1a1a1a]">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#b0ff2a]"></div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-white">
                Ambalay Assistant
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#b0ff2a] font-medium text-black'
                      : 'border border-gray-200 bg-gray-50 text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 dark:bg-[#b0ff2a]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 dark:bg-[#b0ff2a] [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 dark:bg-[#b0ff2a] [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-100 bg-gray-50/50 p-4 dark:border-white/5 dark:bg-white/5"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about geospatial services..."
                className="w-full rounded-full border border-gray-200 bg-white py-3 pl-4 pr-12 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-gray-400 focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder-gray-500 dark:focus:border-[#b0ff2a]"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 p-2 text-gray-600 transition-transform hover:scale-110 disabled:opacity-50 dark:text-[#b0ff2a]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b0ff2a] shadow-lg shadow-[#b0ff2a]/20 transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? (
          <svg
            className="text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        ) : (
          <svg
            className="text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>
    </div>
  )
}

export default ChatbotWidget