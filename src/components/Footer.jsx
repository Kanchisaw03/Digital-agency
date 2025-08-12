import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaXTwitter, FaFacebook } from 'react-icons/fa6';

const navLinks = [
  { name: 'Company', to: '/about' },
  { name: 'Services', to: '/services' },
  { name: 'Resources', to: '/blogs' },
  { name: 'Contact', to: '/contact' },
];

const socials = [
  { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
  { icon: <FaXTwitter />, href: 'https://x.com', label: 'X' },
  { icon: <FaFacebook />, href: 'https://facebook.com', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark border-t border-gray-200 dark:border-neutral-800 py-10 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <span className="text-2xl font-bold bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent tracking-tight">Vigyapana</span>
        </div>
        <nav className="flex gap-6 flex-wrap justify-center">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="text-gray-700 dark:text-gray-300 hover:text-primary-blue font-medium transition">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4">
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-xl text-gray-600 dark:text-gray-400 hover:text-primary-blue transition">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-6">&copy; {new Date().getFullYear()} Vigyapana. All rights reserved.</div>
    </footer>
  );
} 