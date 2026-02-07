import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import aaryaImage from "../assets/aarya-image3.png"

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fullText = "MERN Stack Developer";
  const [text, setText] = useState("");
  const indexRef = useRef(0);
  const forwardRef = useRef(true);

  // Animated mesh background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const gridSize = 50;
    const waveAmplitude = 15;
    const waveFrequency = 0.02;

    const draw = () => {
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines with wave effect
      ctx.strokeStyle = 'rgba(123, 97, 255, 0.15)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 5) {
          const waveX = x + Math.sin(y * waveFrequency + time) * waveAmplitude;
          if (y === 0) {
            ctx.moveTo(waveX, y);
          } else {
            ctx.lineTo(waveX, y);
          }
        }
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 5) {
          const waveY = y + Math.sin(x * waveFrequency + time) * waveAmplitude;
          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }
        ctx.stroke();
      }

      // Draw gradient orbs
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.3,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        300
      );
      gradient1.addColorStop(0, 'rgba(123, 97, 255, 0.15)');
      gradient1.addColorStop(1, 'rgba(123, 97, 255, 0)');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.7,
        0,
        canvas.width * 0.8,
        canvas.height * 0.7,
        400
      );
      gradient2.addColorStop(0, 'rgba(255, 97, 220, 0.08)');
      gradient2.addColorStop(1, 'rgba(255, 97, 220, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Animate name characters
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.03 },
          0.2
        );
      }

      // Animate title
      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.5
      );

      // Animate description
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.6
      );

      // Animate profile image
      tl.fromTo(
        imageRef.current,
        { scale: 0, rotation: -15, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' },
        0.4
      );

      // Animate CTA buttons
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.8
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect for profile image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(imageRef.current, {
        rotationY: xPercent * 10,
        rotationX: -yPercent * 10,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const name = 'Aarya Pandey';

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwardRef.current) {
        // typing forward
        setText(fullText.slice(0, indexRef.current + 1));
        indexRef.current += 1;
        if (indexRef.current === fullText.length) {
          forwardRef.current = false; // start deleting
        }
      } else {
        // deleting
        setText(fullText.slice(0, indexRef.current - 1));
        indexRef.current -= 1;
        if (indexRef.current === 0) {
          forwardRef.current = true; // start typing again
        }
      }
    }, 150); // adjust speed here (ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Text content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-purple text-sm md:text-base font-medium tracking-wider uppercase mb-4">
              Hello, I'm
            </p>

            <h1
              ref={nameRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 overflow-hidden animate-star-blink"
            >
              {name}
            </h1>


            <p
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-6"
            >
              {text}
              <span className="animate-blink">|</span>
            </p>

            <p
              ref={descRef}
              className="text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              I build scalable web applications with modern technologies. Focused
              on creating efficient, user-friendly solutions that make a
              difference.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToProjects}
                className="px-8 py-3.5 rounded-full bg-purple text-white font-medium hover:bg-purple-dark transition-all duration-300 hover:shadow-glow-lg flex items-center gap-2"
              >
                View My Work
                <ArrowDown size={18} />
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-4 mt-10 justify-center lg:justify-start">
              <a
                href="https://github.com/aarya78"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-gray border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple hover:bg-purple/10 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/aarya-pandey-b9831a245/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-gray border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple hover:bg-purple/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aaryapaandey@gmail.com"
                target='_blank'
                className="w-10 h-10 rounded-full bg-dark-gray border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple hover:bg-purple/10 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right column - Profile image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-purple/30 blur-3xl scale-110 animate-pulse-glow" />

              {/* Profile image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-purple/30 animate-float">
                <img
                  src={aaryaImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple/20 to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-dark-gray border border-purple/30 text-purple text-sm font-medium animate-float" style={{ animationDelay: '1s' }}>
                React.js
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-dark-gray border border-accent-pink/30 text-accent-pink text-sm font-medium animate-float" style={{ animationDelay: '2s' }}>
                Node.js
              </div>
              <div className="absolute top-1/2 -right-8 px-4 py-2 rounded-full bg-dark-gray border border-accent-green/30 text-accent-green text-sm font-medium animate-float" style={{ animationDelay: '1.5s' }}>
                MongoDB
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent z-10" />
    </section>
  );
};

export default Hero;
