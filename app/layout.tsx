import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Intelliwave ? Agence de chatbots sur mesure',
  description: 'Nous cr?ons des chatbots IA ?l?gants, performants et parfaitement adapt?s ? votre marque.',
  metadataBase: new URL('https://agentic-8d7af8dd.vercel.app'),
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
