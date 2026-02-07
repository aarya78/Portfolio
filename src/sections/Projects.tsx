import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Code2, FileCode, Layers, Code } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import project1 from '../assets/svwf.png';
import project2 from '../assets/yasvitech.png';
import project3 from '../assets/cafeNexus.png';
import project4 from '../assets/libraryManagement.png';
import project5 from '../assets/portfolio.png';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  icon: React.ReactNode;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Santosh Vidya Welfare Foundation',
    description: 'Empowering education and welfare for underprivileged communities',
    longDescription:
      'Santosh Vidya Welfare Foundation is a non-profit organization dedicated to promoting education, skill development, and overall welfare for underprivileged children and communities. The website provides information about their programs, initiatives, donation options, and volunteer opportunities. It features a clean, responsive design built with React.js and Tailwind CSS, allowing visitors to easily navigate, learn about the foundation’s impact, and contribute to its mission.',
    image: project1,
    technologies: ['React.js', 'Tailwind CSS', 'AppScript'],
    category: 'React.js',
    icon: <Code2 className="w-5 h-5" />,
    liveUrl: 'https://santoshvidyafoundation.org/',
    githubUrl: 'https://github.com',
  },
  {
    id: 2,
    title: 'Yashvitech IT Solutions',
    description: 'Full‑service IT solutions provider for network, infrastructure, and business technology',
    longDescription:
      'Yashvitech IT Solutions is a professional IT services company focused on delivering end‑to‑end technology solutions for businesses. Their offerings include network planning and optimization, IT support and maintenance, hardware and software configuration, and managed technology services. With a commitment to reliability and client‑centric service, they help organizations improve efficiency, enhance collaboration, and streamline operations. The company’s responsive website provides insight into services, expertise, and how they support digital transformation efforts.',
    image: project2,
    technologies: ['React.js', 'Tailwind CSS', 'AppScript'],
    category: 'React.js',
    icon: <FileCode className="w-5 h-5" />,
    liveUrl: 'https://yashvitech.co.in/',
    githubUrl: 'https://github.com',
  },
  {
    id: 3,
    title: 'Cafe Nexus',
    description: 'A modern, responsive café website template',
    longDescription:
      'A clean and modern café website built using HTML, CSS, and JavaScript. It features smooth animations, responsive layouts, a dynamic menu display, and dark mode support. The project is fully customizable and optimized for performance and SEO, making it ideal for small businesses or developers looking to showcase front-end design and interactivity.',
    image: project3,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'JSON Server'],
    category: 'HTML/CSS/JS',
    icon: <Layers className="w-5 h-5" />,
    liveUrl: 'https://cafe-nexus.vercel.app/',
    githubUrl: 'https://github.com/aarya78/Cafe-Nexus',
  },
  {
    id: 4,
    title: 'Library Management System',
    description: 'A responsive web app for managing library books',
    longDescription:
      'A fully functional Library Management System developed using HTML, CSS, JavaScript, and JSON Server. Users can add, update, delete, and view books in a virtual library with real-time data handling. The system includes interactive forms, responsive layouts, and demonstrates practical CRUD operations, front-end interactivity, and efficient data management in a lightweight web application.',
    image: project4,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'JSON Server'],
    category: 'HTML/CSS/JS',
    icon: <Layers className="w-5 h-5" />,
    liveUrl: 'https://library-management-system-94au.vercel.app/layouts/bookManagement.html',
    githubUrl: 'https://github.com/aarya78/Library-Management-System',
  },
  {
  id: 5,
  title: 'Portfolio Website',
  description: 'A modern personal portfolio showcasing projects, skills, and creative development work.',
  longDescription:
    'A visually rich and performance-optimized personal portfolio built using Vite and Tailwind CSS to highlight projects, skills, and professional experience. The website features smooth animations, glassmorphism UI elements, responsive layouts, and interactive sections for projects, contact, and social links. It focuses on clean design, fast loading speeds, and engaging user experience while effectively presenting personal branding, technical expertise, and creative frontend development skills.',
  image: project5,
  technologies: ['Vite', 'Tailwind CSS', 'AppScript'],
  category: 'Vite',
  icon: <Code className="w-5 h-5" />,
  liveUrl: 'https://library-management-system-94au.vercel.app/layouts/bookManagement.html',
  githubUrl: 'https://github.com/aarya78/Library-Management-System',
}
];

const Projects = () => {
  const [showAll, setShowAll] = useState(false);


  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  const visibleCardsRef = useRef<HTMLDivElement[]>([]);

  visibleCardsRef.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              y: 100,
              opacity: 0,
              rotateY: index % 2 === 0 ? -15 : 15,
            },
            {
              y: 0,
              opacity: 1,
              rotateY: 0,
              duration: 1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!visibleCardsRef.current.length) return;

    gsap.fromTo(
      visibleCardsRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      }
    );
  }, [showAll]);


  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section header */}
        <div className="text-center mb-16 section-reveal">
          <p className="text-purple text-sm font-medium tracking-wider uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            expertise in web development.
          </p>
        </div>

        {/* Projects grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {visibleProjects.map((project) => (
            <div
              ref={(el) => {
                if (el) visibleCardsRef.current.push(el);
              }}
              key={project.id}
              className="project-card group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              style={{ transformStyle: 'preserve-3d' }}
            >

              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden group rounded-2xl bg-black/40">
                {/* Blurred glow background */}
                <img
                  src={project.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover scale-150 blur-3xl opacity-50 saturate-150 transition-all duration-700 group-hover:scale-160 group-hover:opacity-70"
                />

                {/* Dark soft vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 z-10" />

                {/* Main sharp image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="relative z-20 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-30 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-lg border border-white/10 flex items-center gap-2">
                  {project.icon}
                  <span className="text-xs font-medium text-gray-300">
                    {project.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 z-30 bg-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-6 py-3 rounded-full bg-white/90 text-dark-bg font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Details
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More / See Less */}
        {projects.length > 3 && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="px-8 py-3 rounded-full border border-purple text-purple font-medium
                 hover:bg-purple hover:text-white transition-all duration-300"
            >
              {showAll ? 'See Less' : 'See More'}
            </button>
          </div>
        )}

      </div>

      {/* Project Detail Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-3xl bg-dark-gray border-white/10 text-white max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              {/* Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-transparent to-transparent" />
              </div>

              <DialogHeader>
                <div className="flex items-center gap-3 mb-2 mt-60">
                  <div className="p-2 rounded-lg bg-purple/10 text-purple">
                    {selectedProject.icon}
                  </div>
                  <span className=" text-sm text-gray-400">
                    {selectedProject.category}
                  </span>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-base leading-relaxed">
                  {selectedProject.longDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Technologies */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full bg-purple/10 text-purple text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-purple text-white font-medium hover:bg-purple-dark transition-colors duration-300"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors duration-300"
                  >
                    <Github size={18} />
                    View Code
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
