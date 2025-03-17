"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart } from "lucide-react"

export default function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  const heartContainerVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      },
    },
  }

  const titleVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.5 },
    },
  }

  const separatorVariants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: { duration: 1, delay: 0.7 },
    },
  }

  const subtitleVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.9 },
    },
  }

  const quoteVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, delay: 1.2 },
    },
  }

  return (
    <div ref={ref} className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute bottom-8 right-8 z-30 w-[300px] shadow-xl rounded-xl overflow-hidden">
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/track/79tiBkScYqTRBvWUG8MJwg?utm_source=generator"
          width="100%"
          height="80"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Player"
        />
      </div>

      <motion.div style={{ y }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[url('/us/20230118-cozinha2.jpg')] bg-cover bg-left"
          role="img"
          aria-label="Foto de fundo do casal"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-70" />
      </motion.div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="max-w-xl"
        >
          <motion.div
            variants={heartContainerVariants}
            initial="initial"
            animate="animate"
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <Heart className="h-16 w-16 text-wedding-purple fill-wedding-purple" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 h-16 w-16 text-wedding-lilac fill-wedding-lilac blur-sm"
              >
                <Heart className="h-16 w-16" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            variants={titleVariants}
            initial="initial"
            animate="animate"
            className="font-['Cormorant_Garamond'] text-5xl md:text-7xl tracking-wider text-white mb-4"
          >
            Kelwin & Isabela
          </motion.h1>

          <motion.div
            variants={separatorVariants}
            initial="initial"
            animate="animate"
            className="h-px bg-gradient-to-r from-transparent via-wedding-purple to-transparent mb-6"
          />

          <motion.p
            variants={subtitleVariants}
            initial="initial"
            animate="animate"
            className="font-['Montserrat'] text-base md:text-lg text-gray-300"
          >
            Nosso memorial de memórias e momentos especiais
          </motion.p>

          <motion.p
            variants={quoteVariants}
            initial="initial"
            animate="animate"
            className="font-['Montserrat'] text-sm italic text-wedding-lilac mt-6"
          >
            "Em 2025 o mundo não acabou, mas a paciencia sim"
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

