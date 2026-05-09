import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, ExternalLink, ChevronDown, ChevronUp, Copy, Check, BookOpen, Video } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { projects } from '../data/projects';
import styles from './Projects.module.css';

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={styles.codeBlock}>
      <button className={styles.codeCopyBtn} onClick={copy} title="Copy code">
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </button>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.15 });
  const [deepOpen, setDeepOpen] = useState(false);

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      style={{ '--card-color': project.color }}
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 70 }}
    >
      {/* Top accent bar */}
      <div className={styles.accentBar} style={{ background: project.color }} />

      <div className={styles.cardInner}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardSubtitle}>{project.subtitle}</p>
            {project.meta && <p className={styles.cardMeta}>{project.meta}</p>}
          </div>
          <div className={styles.cardNum}>0{index + 1}</div>
        </div>

        {/* Description */}
        <p className={styles.cardDesc}>{project.description}</p>

        {/* Tech stack chips */}
        <div className={styles.chips}>
          {project.techStack.map(tech => (
            <span key={tech} className={styles.chip}>{tech}</span>
          ))}
        </div>

        {/* Buttons */}
        <div className={styles.actions}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.btn}>
              <GitFork size={15} /> GitHub
            </a>
          )}
          {project.demo && project.demo !== '#' ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnAccent}`}>
              <ExternalLink size={15} /> Live Demo
            </a>
          ) : project.demo && (
            <a href={project.demo} className={`${styles.btn} ${styles.btnAccent}`}>
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
          {project.caseStudy && (
            <a href={project.caseStudy} className={styles.btn}>
              <BookOpen size={15} /> Case Study
            </a>
          )}
          {project.demoVideo && (
            <a href={project.demoVideo} className={styles.btn}>
              <Video size={15} /> Demo Video
            </a>
          )}
        </div>

        {/* Technical Deep Dive toggle */}
        {project.deepDive && (
          <div className={styles.deepDive}>
            <button
              className={styles.deepDiveToggle}
              onClick={() => setDeepOpen(o => !o)}
            >
              <span>Technical Deep Dive</span>
              {deepOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {deepOpen && (
                <motion.div
                  className={styles.deepContent}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.deepDive.content.map((item, i) => (
                    <div key={i} className={styles.deepItem}>
                      <h4 className={styles.deepHeading}>{item.heading}</h4>
                      <p className={styles.deepText}>{item.text}</p>
                      {item.code && <CodeBlock code={item.code} />}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className={`${styles.section} section`}>
      <div className="container">
        <div className={styles.heading}>
          <h2 className="section-heading">Featured <span>Projects</span></h2>
          <p className="section-subtext">Things I've built that I'm proud of.</p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
