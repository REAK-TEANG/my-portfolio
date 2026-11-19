import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';

// Case-study content, keyed by the /project/:id route. Unknown ids fall back to KAIRO.
const projectsData = {
  'auto-repair': {
    title: 'KAIRO - Auto Repair Workshop System',
    role: 'UX/UI Designer & Full-Stack Developer (solo)',
    timeline: '2024 - Present',
    description: 'KAIRO is a workshop management system for auto repair shops, designed and built end to end by me. It covers appointments, repair orders, customers and vehicles, spare-parts inventory, invoicing, reports, and a dedicated mechanic workbench, in a bilingual (Khmer / English) interface with light and dark modes.',
    link: 'https://car-repair-system-ebon.vercel.app/',
    image: '/projects/kairo/01-dashboard.webp',
    tags: ['React', 'PHP', 'PostgreSQL', 'UX/UI Design', 'Dashboard'],
    stack: [
      { name: 'React', role: 'Frontend UI' },
      { name: 'PHP', role: 'REST API / backend' },
      { name: 'PostgreSQL', role: 'Database' },
    ],
    gallery: [
      { src: '/projects/kairo/00-login.webp', caption: 'Login, with Khmer / English switch' },
      { src: '/projects/kairo/02-appointments.webp', caption: 'Appointments: calendar + status filters' },
      { src: '/projects/kairo/03-repair-jobs.webp', caption: 'Repair orders: parts, mechanic, status at a glance' },
      { src: '/projects/kairo/10-mechanic.webp', caption: 'Mechanic workbench: bay mode, job phases, QA checks' },
      { src: '/projects/kairo/05-vehicles.webp', caption: 'Vehicles and service history' },
      { src: '/projects/kairo/08-invoices.webp', caption: 'Invoices & billing with payment progress' },
      { src: '/projects/kairo/09-reports.webp', caption: 'Reports: export to PDF, Excel, or print' },
    ],
    challenge: 'Repair shops often rely on pen-and-paper or disconnected software to manage customers, parts inventory, and active jobs. This creates bottlenecks and poor customer communication.',
    solution: 'Designed a unified digital platform that brings customers, vehicles, mechanics, and inventory together in one seamless dashboard, improving turnaround times and business insights.'
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData[id] || projectsData['auto-repair'];

  return (
    <div className="min-h-svh bg-paper pb-24 bg-ruled-paper bg-ruled">
      {/* Header / Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-paper/90 backdrop-blur-sm z-50 border-b-2 border-ink border-dashed">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 py-2 group font-mono font-bold uppercase hover:text-accent-pink transition-colors">
            <div className="w-8 h-8 rounded-full border-2 border-ink bg-white flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <ArrowLeft weight="bold" />
            </div>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 max-w-5xl mx-auto px-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-accent-yellow/30 border border-ink font-mono text-xs font-bold uppercase rounded-sm shadow-[2px_2px_0_0_#2b2a29]">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl md:text-6xl text-ink leading-tight mb-8 text-balance">
            {project.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 font-mono text-sm border-y-2 border-ink py-6 mb-12 bg-white/50 backdrop-blur-sm px-6 rounded-sm">
            <div>
              <p className="text-ink/60 font-bold mb-1">ROLE</p>
              <p className="font-bold">{project.role}</p>
            </div>
            <div>
              <p className="text-ink/60 font-bold mb-1">TIMELINE</p>
              <p className="font-bold">{project.timeline}</p>
            </div>
            <div className="md:ml-auto">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 font-bold hover:bg-accent-pink transition-colors group border-2 border-transparent hover:border-ink shadow-[4px_4px_0_0_#2b2a29] hover:shadow-none translate-y-[-4px] hover:translate-y-0"
              >
                VISIT PROJECT
                <ArrowUpRight weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Big Image */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full aspect-video border-4 border-ink shadow-[8px_8px_0_0_#2b2a29] overflow-hidden mb-16 relative bg-gray-200"
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Content Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-8 space-y-12 bg-white p-8 md:p-12 border-2 border-ink shadow-[8px_8px_0_0_#2b2a29]"
          >
            <section>
              <h2 className="font-handwriting text-3xl md:text-4xl mb-4 relative inline-block">
                Overview
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-accent-green" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q25,10 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </h2>
              <p className="font-sans text-base md:text-lg text-ink/80 leading-relaxed">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="font-handwriting text-3xl md:text-4xl mb-4 relative inline-block">
                The Challenge
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-accent-pink" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </h2>
              <p className="font-sans text-base md:text-lg text-ink/80 leading-relaxed">
                {project.challenge}
              </p>
            </section>

            <section>
              <h2 className="font-handwriting text-3xl md:text-4xl mb-4 relative inline-block">
                The Solution
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-accent-blue" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q25,10 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </h2>
              <p className="font-sans text-base md:text-lg text-ink/80 leading-relaxed">
                {project.solution}
              </p>
            </section>
          </motion.div>
        </div>

        {/* Tech Stack */}
        {project.stack && (
          <section className="mt-16">
            <h2 className="font-handwriting text-3xl md:text-4xl mb-6">Built with</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.stack.map((s, i) => (
                <div key={s.name} className={`border-2 border-ink p-6 shadow-[6px_6px_0_0_#2b2a29] ${['bg-accent-blue/40', 'bg-accent-pink/40', 'bg-accent-green/40'][i % 3]}`}>
                  <p className="font-display text-2xl">{s.name}</p>
                  <p className="font-mono text-sm font-bold text-ink/70 mt-2">{s.role}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Screenshot Gallery */}
        {project.gallery && (
          <section className="mt-16">
            <h2 className="font-handwriting text-3xl md:text-4xl mb-8">Inside the system</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {project.gallery.map((g, i) => (
                <motion.figure
                  key={g.src}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                  className={`bg-white p-3 pb-4 border-2 border-ink shadow-[6px_6px_0_0_#2b2a29] ${i === 0 ? 'md:col-span-2' : ''}`}
                >
                  <a href={g.src} target="_blank" rel="noreferrer">
                    <img src={g.src} alt={g.caption} className="w-full border-2 border-ink" loading="lazy" />
                  </a>
                  <figcaption className="font-handwriting text-2xl text-center mt-3">{g.caption}</figcaption>
                </motion.figure>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
