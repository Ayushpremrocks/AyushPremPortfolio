import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './StatsBar.module.css';

const stats = [
  { label: 'Hackathon Wins', value: '3', suffix: '', sub: 'Tekathon 4.0 Winner', color: '#FFD700', isNumeric: true },
  { label: 'GATE 2026', value: 'Qualified', suffix: '', sub: 'CS & IT Branch', color: '#00fff2', isNumeric: false },
  { label: 'GitHub', value: '800', suffix: '+', sub: 'Contributions', color: '#a855f7', isNumeric: true },
  { label: 'LeetCode', value: '1777', suffix: '+', sub: 'Top 8% Global', color: '#ffa116', isNumeric: true },
  { label: 'NPTEL, IIT Kharagpur', value: 'Silver', suffix: '', sub: 'Cloud Computing', color: '#C0C0C0', isNumeric: false },
];

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const numTarget = parseInt(target, 10);

  useEffect(() => {
    let start = 0;
    const end = numTarget;
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numTarget]);

  return <>{count}{suffix}</>;
}

export default function StatsBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.bar}>
      <div className={styles.inner}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={styles.stat}
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <span className={styles.value} style={{ color: s.color }}>
              {/* Conditional rendering to prevent NaN errors on text values */}
              {visible ? (
                s.isNumeric ? <Counter target={s.value} suffix={s.suffix} /> : <>{s.value}{s.suffix}</>
              ) : (
                s.isNumeric ? '0' + s.suffix : '...'
              )}
            </span>
            <span className={styles.label}>{s.label}</span>
            <span className={styles.sub}>{s.sub}</span>
            {/* Divider logic slightly updated to look good on 5 columns */}
            {i < stats.length - 1 && <div className={styles.divider} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}