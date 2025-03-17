"use client"

import { motion } from "framer-motion"
import { Music } from "lucide-react"

interface Quote {
  text: string
  position: "left" | "right" | "center"
}

const QUOTES: Quote[] = [
  {
    text: "Desde o dia em que você veio morar",
    position: "left",
  },
  {
    text: "A minha vida é um inferno",
    position: "right",
  },
  {
    text: "O inferno mais bonito que se há",
    position: "center",
  },
  {
    text: "No planeta terra...",
    position: "left",
  },
]

export default function SongQuotes() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const quoteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-16 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <Music className="h-5 w-5 text-wedding-lilac" />
          <h3 className="font-['Cormorant_Garamond'] text-2xl text-wedding-lilac text-center">Morar Só - Supercombo</h3>
        </div>

        <div className="space-y-8">
          {QUOTES.map((quote, index) => (
            <motion.div
              key={index}
              variants={quoteVariants}
              className={`max-w-md ${quote.position === "left"
                ? "ml-0 mr-auto text-left"
                : quote.position === "right"
                  ? "ml-auto mr-0 text-right"
                  : "mx-auto text-center"
                }`}
            >
              <blockquote
                className={`relative flex gap-1 p-6 rounded-lg ${index % 2 === 0 ? "bg-wedding-purple/10" : "bg-black/30"}`}
              >
                <div className="absolute -top-3 -left-3 text-4xl text-wedding-purple/30">"</div>
                {quote.position !== "right" && <Music className="h-5 w-5 text-wedding-lilac" />}
                <p className="font-['Montserrat'] text-lg italic text-gray-200">{quote.text}</p>
                {quote.position === "right" && <Music className="h-5 w-5 text-wedding-lilac" />}
                <div className="absolute -bottom-3 -right-3 text-4xl text-wedding-purple/30">"</div>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

