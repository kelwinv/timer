"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

import ParallaxHero from "@/components/ui/parallax-hero"
import MemoryWall from "@/components/ui/memory-wall"
import MemoryForm from "@/components/ui/memory-form"
import Countdown from "@/components/ui/countdown"
import LoveMessage from "@/components/ui/love-message"
import SongQuotes from "@/components/ui/song-quotes"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark")

    const metaDescription = document.createElement("meta")
    metaDescription.name = "description"
    metaDescription.content = "Memorial de memórias e momentos especiais de Kelwin & Isabela"
    document.head.appendChild(metaDescription)

    return () => {
      document.documentElement.classList.remove("dark")
      document.head.removeChild(metaDescription)
    }
  }, [])

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const quoteVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ParallaxHero />

      <main className="container mx-auto px-4 py-16">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl mb-4 text-white">Nosso Amor</h2>
          <p className="font-['Montserrat'] text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Aqui guardamos nossas memórias mais especiais juntos, um espaço para recordar momentos que construímos ao
            longo do tempo.
          </p>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <Countdown />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <SongQuotes />
        </motion.div>

        <Tabs defaultValue="memories" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-gray-900">
            <TabsTrigger value="memories" className="data-[state=active]:bg-wedding-purple/50">
              Nossas Memórias
            </TabsTrigger>
            <TabsTrigger value="add" className="data-[state=active]:bg-wedding-purple/50">
              Adicionar Memória
            </TabsTrigger>
          </TabsList>

          <TabsContent value="memories" className="mt-0">
            <MemoryWall />
          </TabsContent>

          <TabsContent value="add" className="mt-0">
            <MemoryForm />
          </TabsContent>
        </Tabs>

        <motion.div
          variants={quoteVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Separator className="max-w-xs mx-auto mb-8 bg-gray-800" />
          <blockquote className="font-['Cormorant_Garamond'] text-lg md:text-xl italic text-gray-400">
            "Encontrei aquele a quem minha alma ama"
          </blockquote>
          <p className="mt-4 text-sm text-wedding-nude">Cânticos 3:4</p>
        </motion.div>

        <LoveMessage />
      </main>

      <footer className="py-8 text-center text-wedding-lilac/70 text-sm">
        <p className="mb-2">© {new Date().getFullYear()} Kelwin & Isabela</p>
        <p className="italic text-xs">"Te amo"</p>
      </footer>
    </div>
  )
}

