"use client";

import { motion } from 'framer-motion'
import { Sparkles, Clock, ShieldCheck, SlidersHorizontal, Globe2, Zap } from 'lucide-react'

const items = [
  { icon: Sparkles, title: 'Exp?rience soign?e', desc: 'Micro-interactions et r?ponses naturelles.' },
  { icon: SlidersHorizontal, title: 'Sur mesure', desc: 'Flux adapt?s ? votre organisation.' },
  { icon: ShieldCheck, title: 'Fiable & s?curis?', desc: 'Bonnes pratiques de s?curit? by design.' },
  { icon: Clock, title: 'R?ponses rapides', desc: 'Optimis? pour la latence et la pr?cision.' },
  { icon: Globe2, title: 'Multicanal', desc: 'Site, app, WhatsApp, Messenger?' },
  { icon: Zap, title: 'Automatisations', desc: 'n8n, Zapier, CRM, ERP et plus.' },
]

export default function Features() {
  return (
    <section id="services" className="container-narrow px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-semibold">Nos services</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-2 text-white/70">De l?id?e au d?ploiement en production.</motion.p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((it, idx) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="card p-6"
          >
            <it.icon className="h-5 w-5 text-[var(--accent)]" />
            <div className="mt-3 text-lg font-medium">{it.title}</div>
            <div className="mt-1 text-sm text-white/60">{it.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
