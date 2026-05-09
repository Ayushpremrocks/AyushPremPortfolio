import { motion } from 'framer-motion';
import Terminal from './Terminal';
import styles from './Hero.module.css';

export default function Hero({ hackerMode }) {
  return (
    <section id="hero" className={`${styles.hero} ${hackerMode ? styles.hacker : ''}`}>
      <div className={styles.gridOverlay} />
      <div className={styles.radial} />

      <div className={styles.inner}>

        {/* The "Code Block" Bio */}
        <motion.div
          className={styles.codeBlock}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.windowHeader}>
            <span className={styles.macDot} style={{ background: '#ff5f56' }} />
            <span className={styles.macDot} style={{ background: '#ffbd2e' }} />
            <span className={styles.macDot} style={{ background: '#27c93f' }} />
            <span className={styles.fileName}>ayush_config.json</span>
          </div>

          <pre className={styles.codeContent}>
            <code>
              <span className={styles.bracket}>&#123;</span><br />
              {"  "}<span className={styles.key}>"developer"</span>: <span className={styles.string}>"Ayush Prem"</span>,<br />
              {"  "}<span className={styles.key}>"status"</span>: <span className={styles.string}>"ML & Full-stack Developer"</span>,<br />
              {"  "}<span className={styles.key}>"skills"</span>: <span className={styles.bracket}>[</span><span className={styles.string}>"Problem Solving"</span>, <span className={styles.string}>"Full Stack"</span>, <span className={styles.string}>"Machine Learning"</span><span className={styles.bracket}>]</span>,<br />
              {"  "}<span className={styles.key}>"location"</span>: <span className={styles.string}>"Chandigarh, India"</span>,<br />
              {"  "}<span className={styles.key}>"action"</span>: <span className={styles.boolean}>"Scroll down or use terminal"</span><br />
              <span className={styles.bracket}>&#125;</span>
            </code>
          </pre>
        </motion.div>

        {/* Visual Connector Line */}
        <motion.div
          className={styles.connector}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />

        {/* Terminal Wrapper */}
        <motion.div
          className={styles.terminalWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 80 }}
        >
          <Terminal hackerMode={hackerMode} />
        </motion.div>

      </div>
    </section>
  );
}