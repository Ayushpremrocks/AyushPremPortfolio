import { motion } from 'framer-motion';
import { Code2, TrendingUp, Star, GitBranch } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import styles from './CodingStats.module.css';

const platforms = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    color: '#FFA116',
    icon: Code2,
    stats: [
      { label: 'Problems Solved', value: '320+' },
      { label: 'Rating', value: '1650' },
      { label: 'Contest Rating', value: '1580' },
      { label: 'Streak', value: '45 days' },
    ],
    link: 'https://leetcode.com/ayushpremrocks',
    badge: 'Knight',
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    color: '#4f9eff',
    icon: TrendingUp,
    stats: [
      { label: 'Max Rating', value: '1320' },
      { label: 'Rank', value: 'Pupil' },
      { label: 'Contests', value: '28' },
      { label: 'Best Rank', value: '#1240' },
    ],
    link: 'https://codeforces.com/profile/ayushpremrocks',
    badge: 'Pupil',
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    color: '#c97b4b',
    icon: Star,
    stats: [
      { label: 'Rating', value: '1620' },
      { label: 'Stars', value: '3★' },
      { label: 'Global Rank', value: '#5420' },
      { label: 'Contests', value: '18' },
    ],
    link: 'https://www.codechef.com/users/ayushpremrocks',
    badge: '3★',
  },
  {
    id: 'github',
    name: 'GitHub',
    color: '#b06aff',
    icon: GitBranch,
    stats: [
      { label: 'Contributions', value: '820+' },
      { label: 'Repositories', value: '32' },
      { label: 'Stars Earned', value: '48' },
      { label: 'PRs Merged', value: '24' },
    ],
    link: 'https://github.com/ayushpremrocks',
    badge: 'Active',
  },
];

/* Simple heatmap placeholder */
function Heatmap({ color }) {
  const cells = Array.from({ length: 52 * 7 }, (_, i) => {
    const rand = Math.random();
    const intensity = rand < 0.5 ? 0 : rand < 0.7 ? 0.3 : rand < 0.85 ? 0.6 : 1;
    return intensity;
  });

  return (
    <div className={styles.heatmap}>
      {cells.map((intensity, i) => (
        <div
          key={i}
          className={styles.heatCell}
          style={{
            background: intensity === 0
              ? 'rgba(255,255,255,0.03)'
              : `rgba(${hexToRgb(color)}, ${intensity * 0.9})`,
          }}
        />
      ))}
    </div>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '255,255,255';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

function PlatformCard({ platform, delay }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 });
  const Icon = platform.icon;

  return (
    <motion.a
      href={platform.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      className={styles.card}
      style={{ '--plat-color': platform.color }}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, type: 'spring', stiffness: 80 }}
      whileHover={{ y: -6 }}
    >
      {/* Glow border */}
      <div className={styles.glowBorder} />

      <div className={styles.cardHead}>
        <div className={styles.platIcon}>
          <Icon size={18} />
        </div>
        <div>
          <div className={styles.platName}>{platform.name}</div>
          <div className={styles.platBadge}>{platform.badge}</div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {platform.stats.map(s => (
          <div key={s.label} className={styles.stat}>
            <div className={styles.statVal}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* GitHub heatmap */}
      {platform.id === 'github' && (
        <Heatmap color={platform.color} />
      )}
    </motion.a>
  );
}

export default function CodingStats() {
  return (
    <section className={`${styles.section} section`}>
      <div className="container">
        <div className={styles.heading}>
          <h2 className="section-heading">Coding <span>Stats</span></h2>
          <p className="section-subtext">My competitive programming journey &amp; open source contributions.</p>
        </div>

        <div className={styles.grid}>
          {platforms.map((p, i) => (
            <PlatformCard key={p.id} platform={p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
