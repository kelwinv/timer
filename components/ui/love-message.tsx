"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function LoveMessage() {
  // Animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-3xl mx-auto text-center py-16 px-4"
    >
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <Heart className="h-8 w-8 text-pink-500 fill-pink-500" />
      </motion.div>

      <motion.h3
        variants={itemVariants}
        className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-wedding-lilac mb-6"
      >
        Nossa Promessa de Amor
      </motion.h3>

      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-transparent via-wedding-purple/30 to-transparent h-px w-full mb-8"
      />

      <motion.p variants={itemVariants} className="font-['Montserrat'] text-gray-300 italic mb-6 leading-relaxed">
        "Tu não és para mim senão uma pessoa inteiramente igual a cem mil outras pessoas.
        E eu não tenho necessidade de ti. E tu não tens necessidade de mim.
        Mas, se tu me cativas, nós teremos necessidade um do outro.
        Serás pra mim o único no mundo. E eu serei para ti a única no mundo"
      </motion.p>

      <motion.p variants={itemVariants} className="font-['Montserrat'] text-wedding-lilac italic mb-6">
        e você se tornou o meu único no mundo. 🦊
      </motion.p>

      <motion.p variants={itemVariants} className="font-['Cormorant_Garamond'] text-xl text-wedding-nude">
        Com todo amor, Kelwin
      </motion.p>
    </motion.div>
  )
}

