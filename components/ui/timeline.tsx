"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Heart, ChevronDown, ChevronUp, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MEMORIES } from "@/utils/MEMORIES"
import { cn } from "@/lib/utils"
import MemoryCard from "./memoryCard"

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }


  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative py-8">
        {!isMobile && (
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-wedding-purple/10 via-wedding-purple/30 to-wedding-purple/10" />
        )}

        <div className="relative z-10">
          {MEMORIES
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((memory, index) => (
              <MemoryCard
                memory={memory}
                index={index}
                isMobile={isMobile}
                expandedId={expandedId}
                toggleExpand={toggleExpand}
                key={memory.id}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

