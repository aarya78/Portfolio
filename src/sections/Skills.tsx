import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  color: string;
}

const skills: Skill[] = [
  { name: 'React.js', category: 'frontend', color: '#61DAFB' },
  { name: 'Tailwind CSS', category: 'frontend', color: '#38B2AC' },
  { name: 'HTML5', category: 'frontend', color: '#E34F26' },
  { name: 'CSS3', category: 'frontend', color: '#1572B6' },
  { name: 'JavaScript', category: 'frontend', color: '#F7DF1E' },
  { name: 'Node.js', category: 'backend', color: '#339933' },
  { name: 'Express.js', category: 'backend', color: '#339933' },
  { name: '.NET', category: 'backend', color: '#339933' },
  { name: 'Django', category: 'backend', color: '#339933' },
  { name: 'PhP', category: 'backend', color: '#339933' },
  { name: 'MongoDB', category: 'database', color: '#47A248' },
  { name: 'SQL', category: 'database', color: '#4479A1' },
  { name: 'PL/SQL', category: 'database', color: '#F80000' },
  { name: 'AppScript', category: 'tools', color: '#4285F4' },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill tags on scroll
      const tags = tagsRef.current?.querySelectorAll('.skill-item');
      if (tags) {
        gsap.fromTo(
          tags,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse repulsion effect
  useEffect(() => {
    const container = tagsRef.current;
    if (!container) return;

    const tags = container.querySelectorAll('.skill-item');
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      tags.forEach((tag) => {
        const tagRect = tag.getBoundingClientRect();
        const tagCenterX = tagRect.left - rect.left + tagRect.width / 2;
        const tagCenterY = tagRect.top - rect.top + tagRect.height / 2;

        const deltaX = tagCenterX - mouseX;
        const deltaY = tagCenterY - mouseY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 20;
          const moveX = (deltaX / distance) * force;
          const moveY = (deltaY / distance) * force;

          gsap.to(tag, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: 'power2.out',
          });
        } else {
          gsap.to(tag, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      });
    };

    const handleMouseLeave = () => {
      tags.forEach((tag) => {
        gsap.to(tag, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const categories = [
    { id: 'frontend', label: 'Frontend', color: '#61DAFB' },
    { id: 'backend', label: 'Backend', color: '#339933' },
    { id: 'database', label: 'Database', color: '#47A248' },
    { id: 'tools', label: 'Tools', color: '#4285F4' },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-pink/5 rounded-full blur-3xl" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Title and description */}
          <div className="section-reveal">
            <p className="text-purple text-sm font-medium tracking-wider uppercase mb-4">
              Expertise
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tech Stack
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I work with a diverse set of technologies to build modern, scalable
              web applications. From frontend interfaces to backend systems and
              databases, I have the skills to bring your ideas to life.
            </p>

            {/* Category legend */}
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-gray border border-white/5"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm text-gray-300">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Skill cloud */}
          <div
            ref={tagsRef}
            className="relative min-h-[400px] flex flex-wrap content-center justify-center gap-3 p-8"
          >
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`skill-item skill-tag cursor-pointer transition-all duration-300 ${
                  hoveredSkill && hoveredSkill !== skill.name
                    ? 'opacity-40'
                    : 'opacity-100'
                }`}
                style={{
                  animationDelay: `${index * 0.05}s`,
                  borderColor:
                    hoveredSkill === skill.name
                      ? skill.color
                      : 'rgba(123, 97, 255, 0.2)',
                  backgroundColor:
                    hoveredSkill === skill.name
                      ? `${skill.color}20`
                      : 'rgba(123, 97, 255, 0.1)',
                  color: hoveredSkill === skill.name ? skill.color : '#E5E5E5',
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {skill.name}
              </div>
            ))}

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border border-purple/10 rounded-full" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border border-accent-pink/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
