"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns"

const WEDDING_DATE = new Date("2025-10-03T18:13:00")

interface TimeUnit {
  value: number
  label: string
}

export default function Countdown() {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([
    { value: 0, label: "DIAS" },
    { value: 0, label: "HORAS" },
    { value: 0, label: "MINUTOS" },
    { value: 0, label: "SEGUNDOS" },
  ])

  const updateCountdown = useCallback(() => {
    const now = new Date()

    if (now >= WEDDING_DATE) {
      setTimeUnits([
        { value: 0, label: "DIAS" },
        { value: 0, label: "HORAS" },
        { value: 0, label: "MINUTOS" },
        { value: 0, label: "SEGUNDOS" },
      ])
      return
    }

    const days = differenceInDays(WEDDING_DATE, now)
    const hours = differenceInHours(WEDDING_DATE, now) % 24
    const minutes = differenceInMinutes(WEDDING_DATE, now) % 60
    const seconds = differenceInSeconds(WEDDING_DATE, now) % 60

    setTimeUnits([
      { value: days, label: "DIAS" },
      { value: hours, label: "HORAS" },
      { value: minutes, label: "MINUTOS" },
      { value: seconds, label: "SEGUNDOS" },
    ])
  }, [])

  useEffect(() => {
    updateCountdown()

    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [updateCountdown])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative py-12 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-900/10 via-purple-900/10 to-pink-900/10 rounded-xl" />

      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3
          variants={itemVariants}
          className="text-center font-['Cormorant_Garamond'] text-2xl md:text-3xl mb-8 text-white"
        >
          Contagem Regressiva para o Grande Dia
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {timeUnits.map((unit, index) => (
            <motion.div key={unit.label} variants={itemVariants} className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl px-4 py-6 w-full"
              >
                <div className="font-['Montserrat'] text-4xl md:text-6xl font-light text-wedding-purple mb-2 text-center">
                  {unit.value.toString().padStart(2, "0")}
                </div>
                <div className="font-['Montserrat'] text-xs tracking-widest text-gray-400 text-center">
                  {unit.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p variants={itemVariants} className="text-center text-gray-400 mt-8 font-['Montserrat'] text-sm">
          03 DE OUTUBRO DE 2025
        </motion.p>
      </motion.div>
    </div>
  )
}

