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
        <div className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl backdrop-blur-xl sm:w-[400px]">
          <div className="flex items-center justify-between border-b border-white/5 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] p-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#b0ff2a]"></div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Ambalay Assistant
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 transition-colors hover:text-white"
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

          <div
            ref={scrollRef}
            className="scrollbar-thin scrollbar-thumb-white/10 flex-1 space-y-4 overflow-y-auto p-4"
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
                      : 'border border-white/10 bg-white/5 text-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b0ff2a]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b0ff2a] [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b0ff2a] [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-white/5 bg-white/5 p-4"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about geospatial services..."
                className="w-full rounded-full border border-white/10 bg-black py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 transition-all focus:border-[#b0ff2a] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 p-2 text-[#b0ff2a] transition-transform hover:scale-110 disabled:opacity-50"
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
