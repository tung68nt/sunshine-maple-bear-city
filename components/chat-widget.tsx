'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Phone, User, Bot, Sparkles, MapPin, Calendar, BookOpen, Headset } from 'lucide-react'
import Image from 'next/image'
import { SCHOOL_INFO } from '@/lib/constants'

type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const MOCK_ANSWERS: Record<string, string> = {
  'address': 'Sunshine Maple Bear is located at Sunshine City, Ciputra Urban Area, Bac Tu Liem, Hanoi.',
  'location': 'The school is located within Sunshine City, Ciputra, Hanoi - one of the greenest and most modern urban areas in the capital.',
  'age': 'The school accepts students from 12 months to 5 years old for our Canadian-standard Kindergarten program.',
  'tuition': 'Tuition at Sunshine Maple Bear is very competitive for an international standard environment. Please leave your phone number so our admissions department can send you a detailed fee schedule.',
  'program': 'We implement the Maple Bear Canada program — one of the world\'s leading early childhood education systems, delivered in a 100% English environment.',
  'english': 'Children are fully immersed in a 100% English environment throughout the day, developing native-like fluency naturally across all learning activities.',
  'facilities': 'The school possesses 5-star standard facilities with a library, multi-purpose room, safe and modern playground.',
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Hello! I am your Maple Bear Virtual Assistant. How can I help you today?',
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }, [])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase()
      let answer = "Thank you for your interest. Currently, I don't have detailed information on this question. Please leave your phone number or email so our admissions team can contact you as soon as possible!"

      for (const key in MOCK_ANSWERS) {
        if (lowerInput.includes(key)) {
          answer = MOCK_ANSWERS[key]
          break
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 1500)
  }

  const quickActions = [
    { label: 'Tuition', key: 'tuition' },
    { label: 'Address', key: 'address' },
    { label: 'Age Group', key: 'age' },
    { label: 'Program', key: 'program' },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* Contact Bubbles */}
      <div className={`flex flex-col gap-3 mb-2 transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <a 
          href="tel:0942546655"
          className="group flex items-center gap-3"
          aria-label="Call Hotline"
        >
          <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-bold text-maple-black shadow-xl border border-white opacity-0 group-hover:opacity-100 transition-opacity">
            {SCHOOL_INFO.PHONE}
          </span>
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer border-2 border-white/20">
            <Phone size={20} />
          </div>
        </a>
      </div>

      {/* Main Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden ${
          isOpen ? 'bg-white text-maple-red rotate-90 scale-90' : 'bg-maple-red text-white hover:scale-110'
        }`}
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative w-full h-full flex items-center justify-center">
            <MessageCircle size={28} className="relative z-10" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div className={`absolute bottom-20 right-0 w-[380px] h-[550px] bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-neutral-100 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${
        isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-0 translate-y-10 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="bg-maple-black p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
              <MessageCircle className="text-white" size={24} />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Maple Bear AI</h2>
              <p className="text-xs text-white/60 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50/50"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-maple-red text-white rounded-tr-none' 
                  : 'bg-white text-maple-black shadow-sm border border-neutral-100 rounded-tl-none'
              }`}>
                {msg.text}
                <p className={`text-[10px] mt-1.5 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-neutral-100 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="px-6 pb-2 pt-4 flex gap-2 overflow-x-auto no-scrollbar">
          {quickActions.map((action) => (
            <button
              key={action.key}
              onClick={() => {
                setInputValue(action.label)
                // Trigger handleSend manually or just let the input be ready
              }}
              className="whitespace-nowrap px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-600 hover:border-maple-red hover:text-maple-red transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="p-6 pt-2">
          <div className="relative">
            <label htmlFor="chat-input" className="sr-only">Type message</label>
            <input
              id="chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="w-full pl-4 pr-12 py-3 bg-neutral-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-maple-red/20 transition-all border-none"
            />
            <button
              onClick={handleSend}
              aria-label="Send message"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-maple-red text-white rounded-xl flex items-center justify-center hover:bg-maple-red-dark transition-colors shadow-lg shadow-maple-red/20"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-[10px] text-center text-neutral-600 mt-3 uppercase tracking-widest font-bold">
            Sunshine Maple Bear City — 2026
          </p>
        </div>
      </div>
    </div>
  )
}
