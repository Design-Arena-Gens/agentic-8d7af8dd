"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 border-b border-white/10 bg-bg/70 backdrop-blur"
    >
      <div className="container-narrow flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight text-white">
          <span className="mr-2 inline-block h-5 w-5 rounded-sm bg-[var(--accent)]" />
          Intelliwave
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="#services" className="btn-ghost">Services</Link>
          <Link href="#projets" className="btn-ghost">Projets</Link>
          <Link href="#contact" className="btn-ghost">Contact</Link>
          <Link href="/chat" className="btn-primary">Essayer le chatbot</Link>
        </nav>
      </div>
    </motion.header>
  )
}
