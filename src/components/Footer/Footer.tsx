import Link from 'next/link'

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Residential Design', href: '#' },
      { label: 'Commercial Spaces', href: '#' },
      { label: 'Luxury Renovation', href: '#' },
      { label: 'Consultation', href: '#' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Pinterest', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Facebook', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-serif font-bold mb-6 block">
              iDesign
            </Link>
            <p className="text-gray-400 mb-6">
              Transforming spaces into timeless masterpieces of luxury and elegance.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-serif mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-secondary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} iDesign. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-secondary text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-secondary text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 