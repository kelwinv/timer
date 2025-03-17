"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Clock, Music, Play, Pause } from "lucide-react"
import Timeline from "@/components/ui/timeline"
import { Button } from "@/components/ui/button"

export default function TimelinePage() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    document.documentElement.classList.add("dark")

    const metaDescription = document.createElement("meta")
    metaDescription.name = "description"
    metaDescription.content = "Linha do tempo de memórias e momentos especiais de Kelwin & Isabela"
    document.head.appendChild(metaDescription)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      document.documentElement.classList.remove("dark")
      document.head.removeChild(metaDescription)
      clearTimeout(timer)

      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (isMusicPlaying) {
      const timer = setTimeout(() => {
        setShowTimeline(true)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setShowTimeline(false)
    }
  }, [isMusicPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsMusicPlaying(true)
    const handlePause = () => setIsMusicPlaying(false)
    const handleEnded = () => setIsMusicPlaying(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [videoRef.current])

  const togglePlayState = () => {
    if (videoRef.current) {
      if (isMusicPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(e => console.error("Erro ao reproduzir vídeo:", e))
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 border-b border-wedding-purple/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" passHref>
            <Button variant="ghost" className="text-wedding-lilac hover:text-white hover:bg-black/50">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-center">Nossa História</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-wedding-lilac hover:text-white hover:bg-black/50"
            onClick={togglePlayState}
          >
            {isMusicPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-wedding-purple mr-2" />
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-white">Linha do Tempo</h2>
          </div>
          <p className="font-['Montserrat'] text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Cada momento especial da nossa jornada juntos, do primeiro encontro até hoje. Deslize para reviver nossas
            memórias mais preciosas.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Music className="h-5 w-5 text-wedding-lilac" />
            <h3 className="font-['Cormorant_Garamond'] text-xl text-wedding-lilac text-center">
              Nossa Canção
            </h3>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <video
              ref={videoRef}
              className="w-full rounded-xl"
              src="/mulberryStreet.mp4"
              preload="metadata"
              playsInline
              controls={false}
            />

            <div
              className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
              onClick={togglePlayState}
              aria-label="Controlar música"
            >
              <div className="bg-wedding-purple/30 backdrop-blur-sm rounded-full p-5">
                {isMusicPlaying ?
                  <Pause className="h-8 w-8 text-white" /> :
                  <Play className="h-8 w-8 text-white" />
                }
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-4 text-wedding-lilac text-sm italic"
          >
            {isMusicPlaying
              ? "Música tocando... Aproveite a linha do tempo!"
              : "Aperte o play para ouvir a música e ver nossa linha do tempo"}
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wedding-purple"></div>
          </div>
        ) : (
          <>
            {showTimeline ? (
              <Timeline />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-wedding-purple/10 mb-4">
                  <Play className="h-8 w-8 text-wedding-lilac" />
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl text-white mb-2">
                  Inicie a música para ver nossa linha do tempo
                </h3>
                <p className="font-['Montserrat'] text-sm text-gray-400 max-w-md mx-auto">
                  Nossa história é melhor contada com a trilha sonora perfeita. Aperte o play no player acima para
                  começar.
                </p>
              </motion.div>
            )}
          </>
        )}
      </main>

      <footer className="py-8 text-center text-wedding-lilac/70 text-sm">
        <p className="mb-2">© {new Date().getFullYear()} Kelwin & Isabela</p>
        <p className="italic text-xs">"Eu quero dividir minha vida com você"</p>
      </footer>
    </div>
  )
}