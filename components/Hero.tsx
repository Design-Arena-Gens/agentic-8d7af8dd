"use client";

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="container-narrow px-4 pt-20 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mb-6 inline-flex animate-float items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Agence IA minimaliste
        </div>
        <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
          Des chatbots sur mesure, ?l?gants et <span className="text-[var(--accent)]">intelligents</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-white/70">
          Intelliwave con?oit des exp?riences conversationnelles rapides, fiables et parfaitement adapt?es ? votre identit?.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event('open-chat'))}
            className="btn-primary"
          >
            Discuter avec l'IA
          </button>
          <a href="#services" className="btn-ghost">D?couvrir nos services</a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {["Strat?gie", "Conception", "Int?gration"].map((title, i) => (
          <motion.div
            key={title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="card p-6"
          >
            <div className="text-sm text-white/60">{`0${i + 1}`}</div>
            <div className="mt-2 text-lg font-medium">{title}</div>
            <div className="mt-2 text-sm text-white/60">
              {i === 0 && 'D?finition des cas d?usage, KPIs et parcours.'}
              {i === 1 && 'Design minimaliste, ton de marque, guidelines.'}
              {i === 2 && 'Connexion CRM, sites, apps et automatisations.'}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
