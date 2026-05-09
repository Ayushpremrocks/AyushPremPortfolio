import { Mail, GitFork, ExternalLink, Code2, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const links = [
  { icon: Mail,        label: 'Email',    href: 'mailto:ayushprem@example.com',      color: '#00fff2' },
  { icon: GitFork,     label: 'GitHub',   href: 'https://github.com/ayushprem',     color: '#e6e6e6' },
  { icon: ExternalLink,label: 'LinkedIn', href: 'https://linkedin.com/in/ayushprem', color: '#0a8ec6' },
  { icon: Code2,       label: 'LeetCode', href: 'https://leetcode.com/ayushprem',   color: '#FFA116' },
];

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        {/* Internship banner */}
        <motion.div
          className={styles.banner}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.bannerDot} />
          <span>Open for SDE Internship opportunities · 2026</span>
          <a href="mailto:ayushprem@example.com" className={styles.bannerCta}>
            Get in touch <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Logo */}
        <motion.div
          className={styles.logo}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className={styles.logoText}>AP</span>
          <span className={styles.logoCursor}>_</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Building things that matter, one commit at a time.
        </motion.p>

        {/* Social links */}
        <motion.div
          className={styles.links}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {links.map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={styles.link}
              style={{ '--lnk-color': color }}
              title={label}
            >
              <Icon size={20} />
              <span>{label}</span>
            </a>
          ))}
        </motion.div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <span>© 2026 Ayush Prem. Built with React + Vite.</span>
          <button
            className={styles.topBtn}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ Back to top
          </button>
        </div>
      </div>

      {/* Bottom glow */}
      <div className={styles.glow} />
    </footer>
  );
}
