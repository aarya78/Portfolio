import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Briefcase, Award, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    year: '2023',
    title: 'Started Coding Journey',
    description:
      'Began my programming journey with HTML, CSS, and JavaScript, building my first websites and falling in love with web development.',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    year: '2025',
    title: 'Joined as a Intern in Tech Company',
    description:
      'Joined a tech company as a full-stack developer, working on enterprise-level applications and expanding my skill set.',
    icon: <Users className="w-5 h-5" />,
  },
  {
    year: '2026',
    title: '10+ Projects Completed',
    description:
      'Reached the milestone of completing 10+ projects, ranging from small business websites to complex web applications.',
    icon: <Award className="w-5 h-5" />,
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline line
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        });
      }

      // Animate milestone cards
      const cards = cardsRef.current?.querySelectorAll('.milestone-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              x: index % 2 === 0 ? -100 : 100,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-pink/5 rounded-full blur-3xl" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section header */}
        <div className="text-center mb-16 section-reveal">
          <p className="text-purple text-sm font-medium tracking-wider uppercase mb-4">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A timeline of my growth as a developer, from my first lines of code
            to becoming a professional MERN stack developer.
          </p>
        </div>

        {/* Timeline */}
        <div ref={cardsRef} className="relative max-w-4xl mx-auto">
          {/* Central line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                ref={lineRef}
                d="M 0 0 L 0 100%"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ height: '100%' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7B61FF" />
                  <stop offset="50%" stopColor="#FF61DC" />
                  <stop offset="100%" stopColor="#7B61FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-purple via-accent-pink to-purple" />

          {/* Milestone cards */}
          <div className="space-y-12 md:space-y-24">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`milestone-card relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <div
                  className={`flex-1 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                  }`}
                >
                  <div className="glass rounded-2xl p-6 hover:border-purple/30 transition-colors duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-purple/10 text-purple text-sm font-medium mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-dark-bg border-2 border-purple flex items-center justify-center text-purple z-10">
                  {milestone.icon}
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-24 section-reveal">
          {[
            { value: '1+', label: 'Years Experience' },
            { value: '10+', label: 'Projects Completed' },
            { value: '12+', label: 'Technologies' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-dark-gray border border-white/5"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
