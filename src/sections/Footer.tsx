import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Code2, Sparkles, Send, MapPin, Phone, Home, Code2Icon, FolderKanban, User, MailIcon, CheckCircle, Loader2 } from 'lucide-react';

const PremiumFooter = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }, 1200); // ⏳ delay before success
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 400);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
      gradient: 'from-slate-600 to-slate-800',
      shadowColor: 'rgba(100, 100, 100, 0.4)',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
      gradient: 'from-blue-500 to-blue-700',
      shadowColor: 'rgba(59, 130, 246, 0.4)',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
      gradient: 'from-sky-400 to-blue-600',
      shadowColor: 'rgba(56, 189, 248, 0.4)',
    },
    {
      name: 'Email',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=aaryapaandey@gmail.com ',
      icon: Mail,
      gradient: 'from-purple-500 to-pink-600',
      shadowColor: 'rgba(168, 85, 247, 0.4)',
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '#hero', icon: <Home /> },
    { name: 'Skills', href: '#skills', icon: <Code2Icon /> },
    { name: 'Projects', href: '#projects', icon: <FolderKanban /> },
    { name: 'About', href: '#about', icon: <User /> },
    { name: 'Contact', href: '#contact', icon: <MailIcon /> },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        {/* Top section */}
        <div className="grid lg:grid-cols-12 gap-16 mb-16">
          {/* Brand & Description */}
          <div className="lg:col-span-5 space-y-6 animate-fade-in-up">
            <div className="group">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#hero');
                }}
                className="inline-flex items-center gap-3 mb-6 transition-all duration-500 hover:scale-105"
              >
                <div className="relative">
                  <Code2 className="w-10 h-10 text-purple-500 relative z-10" />
                  <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <span className="text-3xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow">
                    Aarya Portfolio
                  </span>
                </span>
              </a>
            </div>

            <p className="text-slate-400 text-lg leading-relaxed max-w-lg animate-fade-in-up animation-delay-200">
              Crafting exceptional digital experiences through innovative code and thoughtful design.
              Transforming ideas into scalable, production-ready applications.
            </p>

            {/* Newsletter signup */}
            <div className="animate-fade-in-up animation-delay-400">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                Stay Updated
              </h3>

              {submitted ? (
                <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-3 rounded-lg animate-fade-in">
                  <CheckCircle className="w-5 h-5" />
                  Subscribed successfully!
                </div>
              ) : (
                <div className="flex gap-2 group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:bg-slate-800 transition-all duration-300"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 flex items-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 animate-fade-in-up animation-delay-300">
            <h3 className="text-white font-bold mb-6 text-lg relative inline-block">
              Navigate
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li
                  key={link.name}
                  className="opacity-0 animate-fade-in-left"
                  style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 relative"
                  >
                    <span className="text-xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                      {link.icon}
                    </span>
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 animate-fade-in-up animation-delay-400">
            <h3 className="text-white font-bold mb-6 text-lg relative inline-block">
              Contact
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-transparent rounded-full" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group opacity-0 animate-fade-in-right animation-delay-700" style={{ animationFillMode: 'forwards' }}>
                <Mail className="w-5 h-5 text-purple-400 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <a
                  href="mailto:aaryapaandey669@gmail.com"
                  className="text-slate-400 hover:text-white transition-colors duration-300 break-all"
                >
                  aaryapaandey669@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 group opacity-0 animate-fade-in-right animation-delay-800" style={{ animationFillMode: 'forwards' }}>
                <Phone className="w-5 h-5 text-pink-400 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <a
                  href="tel:+917999822556"
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  +91 7999822556
                </a>
              </li>
              <li className="flex items-start gap-3 opacity-0 animate-fade-in-right animation-delay-900" style={{ animationFillMode: 'forwards' }}>
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                <span className="text-slate-400">
                  Raipur, Chhattisgarh
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3 animate-fade-in-up animation-delay-500">
            <h3 className="text-white font-bold mb-6 text-lg relative inline-block">
              Connect
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(link.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className={`relative group opacity-0 animate-fade-in-scale transition-all duration-300 ${hoveredSocial === link.name ? "scale-110 text-purple-400" : ""
                      }`}
                    style={{ animationDelay: `${700 + index * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <div className={`relative bg-gradient-to-br ${link.gradient} p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden`}>
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      {/* Icon */}
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <Icon className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-xs font-semibold text-white/90">{link.name}</span>
                      </div>

                      {/* Glow effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                        style={{ background: link.shadowColor }}
                      />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider with animation */}
        <div className="relative h-px my-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-shimmer" />
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in-up animation-delay-1000">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>© {currentYear}</span>
            <span className="w-1 h-1 rounded-full bg-purple-500 animate-pulse" />
            <span className="font-medium text-slate-400">Aarya Pandey</span>
            <span className="w-1 h-1 rounded-full bg-pink-500 animate-pulse animation-delay-500" />
            <span>All rights reserved</span>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-slate-500 text-sm group">
            <span>Crafted </span>
            <Code2 className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-slate-400 font-medium">using React & Tailwind CSS</span>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl transition-all duration-500 z-50 group overflow-hidden ${showScrollTop
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-16 scale-50 pointer-events-none'
          }`}
        aria-label="Scroll to top"
      >
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 24}`}
            strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        {/* Icon */}
        <ArrowUp className="absolute inset-0 m-auto w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />

        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />

        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-active:opacity-20 group-active:animate-ripple" />
      </button>
    </footer>
  );
};

export default PremiumFooter;