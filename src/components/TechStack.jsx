import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { techCategories } from '../data/techStack';
import styles from './TechStack.module.css';

function SkillCard({ skill, delay }) {
  return (
    <motion.div
      className={styles.skillCard}
      style={{ '--skill-color': skill.color }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -4, boxShadow: `0 0 20px ${skill.color}33` }}
    >
      <span className={styles.skillName}>{skill.name}</span>
      <div className={styles.levelBar}>
        <motion.div
          className={styles.levelFill}
          style={{ background: skill.color }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: skill.level / 100 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section id="tech-stack" className={`${styles.section} section`}>
      <div className="container">
        <div className={styles.heading}>
          <h2 className="section-heading">Tech <span>Stack</span></h2>
          <p className="section-subtext">Tools &amp; technologies I use to bring ideas to life.</p>
        </div>

        <div className={styles.categories}>
          {techCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              className={styles.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.06 }}
            >
              <div className={styles.catHeader}>
                <span className={styles.catLabel}>{cat.label}</span>
                <span className={styles.catCount}>{cat.skills.length}</span>
              </div>
              <div className={styles.skills}>
                {cat.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} delay={catIdx * 0.05 + i * 0.05} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
