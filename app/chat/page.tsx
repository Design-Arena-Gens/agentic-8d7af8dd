import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false })

export default function ChatPage() {
  return (
    <main>
      <Navbar />
      <section className="container-narrow px-4 pt-10">
        <h1 className="text-2xl font-semibold">Chat avec l?IA</h1>
        <p className="mt-2 text-white/70">Discutez avec notre assistant pour d?couvrir nos services.</p>
        <div className="mt-6">
          <ChatWidget openInitially={true} docked={false} />
        </div>
      </section>
    </main>
  )
}
