"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart, Calendar, MapPin, Music } from "lucide-react"
import { MEMORIES } from "@/utils/MEMORIES"
import Link from "next/link"
import { Button } from "./button"

export default function MemoryWall() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedView, setExpandedView] = useState(false)

  const nextMemory = () => {
    setCurrentIndex((prev) => (prev + 1) % MEMORIES.length)
  }

  const prevMemory = () => {
    setCurrentIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length)
  }

  const currentMemory = MEMORIES[currentIndex]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  const quoteVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative">
        {/* Visualização principal da memória */}
        <motion.div
          className={`relative rounded-lg overflow-hidden shadow-xl transition-all duration-500 ${expandedView ? "aspect-auto h-[70vh]" : "aspect-[4/3]"
            }`}
          layoutId="memoryContainer"
        >
          <Image
            src={currentMemory.image || "/placeholder.svg"}
            alt={currentMemory.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            onClick={() => setExpandedView(!expandedView)}
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 md:p-6">
            <motion.div
              key={`info-${currentMemory.id}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="text-white"
            >
              <div className="flex items-center gap-2 text-wedding-lilac mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{currentMemory.date}</span>
                <MapPin className="h-4 w-4 ml-2" />
                <span className="text-sm">{currentMemory.location}</span>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-medium">{currentMemory.title}</h3>
              <p className="font-['Montserrat'] text-sm md:text-base text-gray-300 mt-1">{currentMemory.description}</p>

              {currentMemory.quote && (
                <motion.div
                  key={`quote-${currentMemory.id}`}
                  variants={quoteVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-3 pt-3 border-t border-wedding-purple/20"
                >
                  <p className="font-['Montserrat'] text-sm italic text-wedding-lilac">"{currentMemory.quote}"</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          <motion.button
            className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Favoritar memória"
          >
            <Heart className="h-5 w-5 text-wedding-nude fill-wedding-nude" />
          </motion.button>
        </motion.div>

        <button
          onClick={prevMemory}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-md transition-all z-10"
          aria-label="Memória anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextMemory}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-md transition-all z-10"
          aria-label="Próxima memória"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4">
        {MEMORIES.slice(0, 6).map((memory, index) => (
          <motion.div
            key={memory.id}
            className={`relative aspect-square rounded-md overflow-hidden cursor-pointer ${index === currentIndex ? "ring-2 ring-wedding-purple" : ""
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={memory.image || "/placeholder.svg"}
              alt={memory.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 150px"
            />
            <div className={`absolute inset-0 bg-black/40 ${index === currentIndex ? "bg-black/10" : ""}`} />
          </motion.div>
        ))}
      </div>
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center mt-8"
      >
        <Link href="/timeline" passHref>
          <Button
            variant="outline"
            className="bg-wedding-purple/10 border-wedding-purple/30 hover:bg-wedding-purple/20 text-wedding-lilac"
          >
            <Music className="mr-2 h-4 w-4" />
            Ver Linha do Tempo com Música
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

