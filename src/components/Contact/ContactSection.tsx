'use client'

import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-beige">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-primary mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready to transform your space? Contact us to schedule a consultation and discuss your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary transition-colors"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary transition-colors"
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-12"
          >
            <div className="space-y-8">
              <div>
                <h3 className="heading-md text-primary mb-4">Visit Our Studio</h3>
                <p className="text-gray-600">
                  123 Design Avenue
                  <br />
                  Luxury District
                  <br />
                  New York, NY 10001
                </p>
              </div>
              <div>
                <h3 className="heading-md text-primary mb-4">Contact Information</h3>
                <p className="text-gray-600">
                  Phone: +1 (555) 123-4567
                  <br />
                  Email: info@idesign.com
                  <br />
                  Hours: Mon-Fri: 9am - 6pm
                </p>
              </div>
              <div>
                <h3 className="heading-md text-primary mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {['Instagram', 'Pinterest', 'LinkedIn'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-primary hover:text-secondary transition-colors duration-300"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}