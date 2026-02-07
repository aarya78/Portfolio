import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
}

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'Home', href: '#hero' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string): void => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes mobileMenuSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(147, 51, 234, 0);
          }
        }

        .nav-animate {
          animation: fadeInDown 0.6s ease-out;
        }

        .nav-link {
          position: relative;
          color: #9ca3af;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #9333ea, #c084fc);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          animation: pulse 2s infinite;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .logo-text {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .logo-text:hover {
          transform: scale(1.05);
        }

        .logo-bracket {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .logo-text:hover .logo-bracket {
          transform: translateX(3px);
        }

        .logo-text:hover .logo-bracket:first-child {
          transform: translateX(-3px);
        }

        .mobile-menu-item {
          animation: mobileMenuSlide 0.4s ease-out forwards;
          opacity: 0;
        }

        .hamburger-line {
          transition: all 0.3s ease;
        }
      `}</style>

      <nav
        className={`nav-animate fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-gray-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-purple-500/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="logo-text text-xl md:text-2xl font-bold text-white tracking-tight"
            >
              <span className="logo-bracket text-purple-600">&lt;</span>
              Aarya
              <span className="logo-bracket text-purple-600">/&gt;</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link: NavLink, index: number) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="nav-link"
                  style={{
                    animationDelay: `${0.1 + index * 0.1}s`,
                    animation: 'slideInRight 0.6s ease-out forwards'
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block" style={{ animation: 'slideInRight 0.6s ease-out 0.6s forwards', opacity: 0 }}>
              <a
                href="#contact"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="cta-button relative px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white hover:text-purple-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="hamburger-line" />
              ) : (
                <Menu size={24} className="hamburger-line" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-gray-950/98 backdrop-blur-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link: NavLink, index: number) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`mobile-menu-item text-2xl font-semibold text-white hover:text-purple-400 transition-all duration-300 hover:scale-110 ${
                isMobileMenuOpen ? '' : 'opacity-0'
              }`}
              style={{
                animationDelay: isMobileMenuOpen ? `${index * 0.1}s` : '0s',
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className={`mobile-menu-item mt-4 px-8 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 ${
              isMobileMenuOpen ? '' : 'opacity-0'
            }`}
            style={{
              animationDelay: isMobileMenuOpen ? `${navLinks.length * 0.1}s` : '0s',
            }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;