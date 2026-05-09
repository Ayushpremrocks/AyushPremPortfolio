import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Monitor, Trophy } from 'lucide-react';
import { timelineItems } from '../data/timeline';
import styles from './Timeline.module.css';

const iconMap = {
  GraduationCap, Briefcase, Monitor, Trophy,
};

export default function Timeline() {
  return (
    <section id="experience" className={`${styles.section} section`}>
      <div className="container">
        <div className={styles.heading}>
          <h2 className="section-heading">Experience &amp; <span>Journey</span></h2>
          <p className="section-subtext">Where I've been and what I've accomplished.</p>
        </div>

        <div className={styles.timeline}>
          {timelineItems.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Briefcase;
            return (
              <motion.div
                key={item.id}
                className={`${styles.item} ${item.current ? styles.current : ''}`}
                style={{ '--item-color': item.color }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Connector line */}
                <div className={styles.connector}>
                  <div className={styles.iconWrap}>
                    <Icon size={16} />
                  </div>
                  {i < timelineItems.length - 1 && <div className={styles.line} />}
                </div>

                {/* Card */}
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div>
                      <div className={styles.period}>{item.period}</div>
                      <h3 className={styles.title}>{item.title}</h3>
                      <div className={styles.org}>{item.organization}</div>
                    </div>
                    {item.current && (
                      <span className={styles.badge}>Current</span>
                    )}
                  </div>
                  <p className={styles.desc}>{item.description}</p>
                  <div className={styles.tags}>
                    {item.tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
