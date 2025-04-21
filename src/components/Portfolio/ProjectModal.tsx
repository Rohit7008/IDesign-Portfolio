'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface ProjectImage {
  url: string
  caption?: string
}

interface ProjectDetails {
  id: number
  title: string
  location: string
  description: string
  concept: string
  features: string[]
  mainImage: string
  images: ProjectImage[]
  category: string
}

interface ProjectModalProps {
  project: ProjectDetails | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isClosing, setIsClosing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  // Motion values for drag feedback
  const dragX = useMotionValue(0)
  const dragProgress = useTransform(dragX, [-200, 0, 200], [-1, 0, 1])
  const dragOpacity = useTransform(dragProgress, [-1, 0, 1], [0.3, 1, 0.3])
  const nextImageOpacity = useTransform(dragProgress, [-1, 0, 1], [1, 0, 0])
  const prevImageOpacity = useTransform(dragProgress, [-1, 0, 1], [0, 0, 1])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
      if (!isMobile) {
        if (e.key === 'ArrowLeft') {
          paginate(-1)
        }
        if (e.key === 'ArrowRight') {
          paginate(1)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobile])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const getNextImageIndex = (direction: number) => {
    if (!project) return 0
    const nextIndex = currentImageIndex + direction
    if (nextIndex < 0) return project.images.length - 1
    if (nextIndex >= project.images.length) return 0
    return nextIndex
  }

  const slideVariants = {
    enter: (direction: number) => ({
      scale: 0.95,
      opacity: 0,
      x: direction > 0 ? '100%' : '-100%'
    }),
    center: {
      zIndex: 1,
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      scale: 0.95,
      opacity: 0,
      x: direction < 0 ? '100%' : '-100%',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = useCallback((newDirection: number) => {
    if (!project || isDragging) return
    setDirection(newDirection)
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection
      if (nextIndex < 0) return project.images.length - 1
      if (nextIndex >= project.images.length) return 0
      return nextIndex
    })
  }, [project, isDragging])

  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Luxury glassmorphism background with subtle pattern */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        className="absolute inset-0 bg-black/70"
        style={{
          backgroundImage: 'url("/subtle-pattern.png")',
          backgroundBlendMode: 'soft-light',
          backgroundOpacity: 0.1
        }}
        onClick={handleClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative w-full max-w-[90vw] lg:max-w-7xl mx-4 bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-white/10 ${
          isClosing ? 'scale-95 opacity-0' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-50 group"
          aria-label="Close modal"
        >
          <div className="relative w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50 group-hover:border-gold/50 group-hover:scale-110">
            <svg
              className="w-6 h-6 text-white/70 transition-colors duration-300 group-hover:text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] max-h-[90vh]">
          {/* Image Gallery */}
          <div className="relative bg-black/30 flex items-center justify-center overflow-hidden">
            {/* Previous Image Preview */}
            {!isMobile && (
              <motion.div
                style={{ opacity: prevImageOpacity }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={project.images[getNextImageIndex(-1)].url}
                  alt="Previous"
                  fill
                  className="object-contain opacity-30"
                  priority={false}
                />
              </motion.div>
            )}

            {/* Current Image */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentImageIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ 
                  x: dragX,
                  opacity: dragOpacity,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, { offset, velocity }) => {
                  setIsDragging(false)
                  const swipe = swipePower(offset.x, velocity.x)
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                className="absolute w-full h-full cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={project.images[currentImageIndex].url}
                  alt={project.title}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next Image Preview */}
            {!isMobile && (
              <motion.div
                style={{ opacity: nextImageOpacity }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={project.images[getNextImageIndex(1)].url}
                  alt="Next"
                  fill
                  className="object-contain opacity-30"
                  priority={false}
                />
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {!isMobile && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-8 pointer-events-none">
                <button
                  className="group pointer-events-auto transform -translate-x-4 transition-all duration-300 hover:translate-x-0 focus:outline-none"
                  onClick={() => paginate(-1)}
                  aria-label="Previous image"
                >
                  <div className="relative w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50 group-hover:border-gold/50 group-hover:scale-110">
                    <svg
                      className="w-8 h-8 text-white/70 transition-colors duration-300 group-hover:text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                </button>

                <button
                  className="group pointer-events-auto transform translate-x-4 transition-all duration-300 hover:translate-x-0 focus:outline-none"
                  onClick={() => paginate(1)}
                  aria-label="Next image"
                >
                  <div className="relative w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50 group-hover:border-gold/50 group-hover:scale-110">
                    <svg
                      className="w-8 h-8 text-white/70 transition-colors duration-300 group-hover:text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            )}

            {/* Navigation Hint */}
            <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-white/70 ${
              isDragging ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-300`}>
              {isMobile ? (
                <>
                  <svg
                    className="w-5 h-5 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span className="text-sm">Swipe to navigate</span>
                  <svg
                    className="w-5 h-5 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </>
              ) : (
                <span className="text-sm opacity-60">
                  Use arrow keys or drag to navigate
                </span>
              )}
            </div>

            {/* Image Counter and Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between text-white/90">
                <p className="text-sm font-light">
                  {project.images[currentImageIndex].caption}
                </p>
                <span className="text-sm font-light">
                  {currentImageIndex + 1} / {project.images.length}
                </span>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-8 overflow-y-auto bg-white/5 backdrop-blur-sm">
            <div className="space-y-8">
              <div className="border-b border-white/10 pb-6">
                <h2 className="font-serif text-3xl text-white mb-2">{project.title}</h2>
                <p className="text-gold/90 font-light">{project.location}</p>
              </div>

              <div>
                <h3 className="text-xl text-white/90 font-serif mb-3">About the Project</h3>
                <p className="text-white/70 leading-relaxed">{project.description}</p>
              </div>

              <div>
                <h3 className="text-xl text-white/90 font-serif mb-3">Design Concept</h3>
                <p className="text-white/70 leading-relaxed">{project.concept}</p>
              </div>

              <div>
                <h3 className="text-xl text-white/90 font-serif mb-4">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-white/70 space-x-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/80" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 