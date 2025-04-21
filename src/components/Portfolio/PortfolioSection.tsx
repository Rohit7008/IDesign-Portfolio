'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ProjectModal from './ProjectModal'

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Modern Minimalist Villa',
    location: 'Beverly Hills, CA',
    description: 'A stunning contemporary villa that embraces minimalist design principles while maintaining a warm and inviting atmosphere. The project focused on creating seamless indoor-outdoor living spaces and maximizing natural light throughout the residence.',
    concept: 'The design concept revolves around the principle of "less is more," utilizing clean lines, neutral colors, and natural materials to create a sophisticated and timeless aesthetic. The integration of smart home technology ensures both luxury and convenience.',
    features: [
      'Open-concept living spaces',
      'Floor-to-ceiling windows',
      'Custom Italian marble finishes',
      'Smart home automation',
      'Infinity pool with ocean views',
      'Gourmet kitchen with premium appliances'
    ],
    mainImage: '/portfolio/project1-main.jpg',
    images: [
      { url: '/portfolio/project1-main.jpg', caption: 'Main Living Area' },
      { url: '/portfolio/project1-kitchen.jpg', caption: 'Gourmet Kitchen' },
      { url: '/portfolio/project1-bedroom.jpg', caption: 'Master Suite' },
      { url: '/portfolio/project1-pool.jpg', caption: 'Infinity Pool' }
    ],
    category: 'Residential'
  },
  {
    id: 2,
    title: 'Luxury Boutique Hotel',
    location: 'Miami, FL',
    description: 'A boutique hotel that redefines luxury hospitality through its unique blend of art deco inspiration and contemporary design. Each space is carefully curated to provide an unforgettable guest experience.',
    concept: 'Drawing inspiration from Miami\'s rich architectural heritage, the design merges art deco elements with modern luxury, creating spaces that are both Instagram-worthy and functionally superior.',
    features: [
      'Custom-designed furniture',
      'Signature spa facilities',
      'Rooftop infinity pool',
      'Fine dining restaurant',
      'Art gallery space',
      'Private beach access'
    ],
    mainImage: '/portfolio/project2-main.jpg',
    images: [
      { url: '/portfolio/project2-main.jpg', caption: 'Hotel Lobby' },
      { url: '/portfolio/project2-room.jpg', caption: 'Luxury Suite' },
      { url: '/portfolio/project2-spa.jpg', caption: 'Spa Area' },
      { url: '/portfolio/project2-restaurant.jpg', caption: 'Restaurant' }
    ],
    category: 'Hospitality'
  }
]

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))]
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-primary mb-4">Our Portfolio</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Explore our collection of meticulously crafted spaces that showcase our commitment to excellence in interior design.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                <Image
                  src={project.mainImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm font-light">{project.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 