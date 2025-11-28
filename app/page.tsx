"use client";

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false })

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />

      <section id="projets" className="container-narrow px-4 pb-24">
        <div className="card p-8 text-center">
          <h3 className="text-xl font-medium">Un chatbot qui vous ressemble</h3>
          <p className="mt-2 text-sm text-white/70">Nous adaptons le ton, le style et l?interface ? votre marque, jusqu?aux micro-interactions.</p>
          <div className="mt-5">
            <button onClick={() => window.dispatchEvent(new Event('open-chat'))} className="btn-primary">Essayer maintenant</button>
          </div>
        </div>
      </section>

      <Footer />
      {/* Floating chat widget */}
      <ChatWidget />
    </main>
  )
}
