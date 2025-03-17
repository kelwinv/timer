import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Heart, ChevronUp, ChevronDown, Play, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MEMORIES } from '@/utils/MEMORIES';

type TypeMemoryCard = {
  memory: typeof MEMORIES[0];
  isMobile: boolean;
  expandedId: number | null;
  index: number;
  toggleExpand: (id: number) => void;
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

const contentVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2 },
  },
}

const fullscreenVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
}

const MemoryCard = ({ memory, isMobile, expandedId, index, toggleExpand }: TypeMemoryCard) => {
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isExpanded = expandedId === memory.id;

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFullscreenMode(!fullscreenMode);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenMode) {
        setFullscreenMode(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [fullscreenMode]);

  useEffect(() => {
    if (isExpanded && memory.videoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {
        setVideoError(true);
      });
    }
  }, [isExpanded, memory.videoUrl]);

  useEffect(() => {
    if (!isExpanded) {
      setFullscreenMode(false);
    }
  }, [isExpanded]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <motion.div
      key={memory.id}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`mb-12 md:mb-16 relative ${isMobile
        ? "pl-8 border-l-2 border-wedding-purple/20"
        : index % 2 === 0
          ? "md:ml-auto md:mr-[50%] md:pr-8"
          : "md:mr-auto md:ml-[50%] md:pl-8"
        }`}
    >
      <div
        className={`absolute ${isMobile
          ? "-left-[10px] top-0"
          : index % 2 === 0
            ? "md:right-[-10px]"
            : "md:left-[-10px]"
          } w-5 h-5 rounded-full bg-wedding-purple z-10`}
      />
      <div
        className={cn(
          "bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all",
          isMobile ? "w-full" : "md:w-[90%] lg:w-[85%]",
          isExpanded ? "ring-2 ring-wedding-purple/50" : ""
        )}
      >
        <div
          className={cn(
            "p-4 cursor-pointer flex items-start gap-4",
            { "pl-2": isMobile }
          )}
          onClick={() => toggleExpand(memory.id)}
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-black/20 z-10" />
            <Image
              src={memory.image || "/placeholder.svg"}
              alt={memory.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 64px, 80px"
            />
            {memory.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white/20" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-wedding-lilac text-xs mb-1 flex-wrap">
              <Calendar className="h-3 w-3" />
              <span>{memory.date}</span>
              <MapPin className="h-3 w-3 ml-1" />
              <span className="truncate">{memory.location}</span>
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-lg text-white truncate">{memory.title}</h3>
            <p className="font-['Montserrat'] text-xs text-gray-300 line-clamp-1">{memory.description}</p>
          </div>

          <div className="flex-shrink-0 text-wedding-lilac">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="relative aspect-video w-full group">
                {memory.videoUrl ? (
                  <>
                    <div className="absolute inset-0 bg-black/10 z-10"></div>
                    <video
                      ref={videoRef}
                      src={memory.videoUrl || "#"}
                      poster={memory.image || "/placeholder.svg"}
                      className="w-full h-full object-cover"
                      playsInline
                      loop
                      muted={false}

                      onError={handleVideoError}
                    />
                    {videoError && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40">
                        <p className="text-white text-sm">Video could not be loaded</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Image
                      src={memory.image || "/placeholder.svg"}
                      alt={memory.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
                      priority={isExpanded}
                      quality={85}
                      onClick={toggleFullscreen}
                    />
                  </>
                )}
              </div>
              <div className="p-4 pt-2">
                <p className="font-['Montserrat'] text-sm text-gray-200 mb-3">{memory.description}</p>
                {memory.quote && (
                  <div className="flex items-center gap-2 pt-3 border-t border-wedding-purple/20">
                    <Heart className="w-4 h-4 text-wedding-nude" />
                    <p className="font-['Montserrat'] text-sm italic text-wedding-lilac">"{memory.quote}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {fullscreenMode && !memory.videoUrl && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center"
            variants={fullscreenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={toggleFullscreen}
          >
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-black/30 border-white/50 hover:bg-black/50"
              onClick={toggleFullscreen}
            >
              <X className="w-6 h-6 text-white" />
            </Button>

            <div className="relative w-full h-[70vh] max-w-6xl">
              <Image
                src={memory.image || "/placeholder.svg"}
                alt={memory.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                quality={90}
              />
            </div>

            <div className="max-w-2xl mt-6 px-4">
              <h2 className="font-['Cormorant_Garamond'] text-2xl text-white mb-2">{memory.title}</h2>

              <div className="flex items-center gap-3 text-wedding-lilac text-sm mb-3">
                <Calendar className="h-4 w-4" />
                <span>{memory.date}</span>
                <MapPin className="h-4 w-4 ml-1" />
                <span>{memory.location}</span>
              </div>

              <p className="font-['Montserrat'] text-sm text-gray-200 mb-4">{memory.description}</p>

              {memory.quote && (
                <div className="flex items-center gap-2 pt-3 border-t border-wedding-purple/20">
                  <Heart className="w-4 h-4 text-wedding-nude" />
                  <p className="font-['Montserrat'] text-sm italic text-wedding-lilac">"{memory.quote}"</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemoryCard;