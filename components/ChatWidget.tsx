"use client";

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquare, Send, X } from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWidget({ openInitially = false, docked = true }: { openInitially?: boolean; docked?: boolean }) {
  const [open, setOpen] = useState(openInitially)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Bonjour, je suis l'assistant d'Intelliwave. Comment puis-je vous aider ?" },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('open-chat', onOpen as any)
    return () => window.removeEventListener('open-chat', onOpen as any)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const containerStyles = useMemo(
    () => (docked ? 'fixed bottom-5 right-5' : ''),
    [docked]
  )

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim()
    if (!content) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', content }])
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      })
      const isJson = res.headers.get('content-type')?.includes('application/json')
      const payload = isJson ? await res.json() : { reply: await res.text() }
      const reply: string = payload.reply ?? payload.response ?? payload.message ?? '...'
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: "D?sol?, une erreur est survenue. Veuillez r?essayer." }])
    } finally {
      setLoading(false)
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    void sendMessage()
  }

  return (
    <div className={containerStyles}>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(true)}
            className="btn-primary shadow-glow flex h-12 w-12 items-center justify-center"
            aria-label="Ouvrir le chatbot"
          >
            <MessageSquare className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 210, damping: 22 }}
            className="card w-[min(92vw,420px)] overflow-hidden border-white/10 bg-white/5 backdrop-blur"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-sm font-medium text-white">Assistant Intelliwave</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-white/70 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] min-h-[280px] space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[var(--accent)] text-black'
                        : 'bg-white/8 text-white border border-white/10'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-white/8 px-4 py-2 text-sm text-white/80">R?daction?</div>
                </div>
              )}
            </div>
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="?crivez votre message?"
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--accent)]/60"
              />
              <button type="submit" className="btn-primary h-9 px-4">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
