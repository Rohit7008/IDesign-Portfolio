'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navigation/Navbar'
import ServicesSection from '@/components/Services/ServicesSection'
import PortfolioSection from '@/components/Portfolio/PortfolioSection'
import ContactSection from '@/components/Contact/ContactSection'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Luxury Interior Design"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>

          {/* Hero Content */}
          <div className="relative container-custom h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <h1 className="heading-xl mb-6">
                Designing Spaces.
                <br />
                Defining Lifestyles.
              </h1>
              <p className="text-lg md:text-xl mb-8 font-light">
                Transform your space into a masterpiece of luxury and elegance with our expert interior design services.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                Book a Consultation
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section-padding bg-beige">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="heading-lg mb-6 text-primary">Our Design Philosophy</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                At iDesign, we believe that every space tells a story. Our approach combines timeless elegance with contemporary innovation, creating interiors that reflect your unique lifestyle and aspirations. With meticulous attention to detail and a passion for perfection, we transform ordinary spaces into extraordinary experiences.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* Portfolio Section */}
        <PortfolioSection />

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </>
  )
} 