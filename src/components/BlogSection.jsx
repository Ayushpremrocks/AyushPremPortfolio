import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { blogPosts, blogTags } from '../data/blogPosts';
import styles from './BlogSection.module.css';

/* Gradient palettes for empty/placeholder cards */
const GRADIENTS = [
  'linear-gradient(135deg, #00fff2 0%, #0061ff 100%)',
  'linear-gradient(135deg, #b06aff 0%, #ff6b35 100%)',
  'linear-gradient(135deg, #00ff88 0%, #00b4d8 100%)',
  'linear-gradient(135deg, #ff6b35 0%, #ffd60a 100%)',
  'linear-gradient(135deg, #4f9eff 0%, #b06aff 100%)',
  'linear-gradient(135deg, #00fff2 0%, #b06aff 100%)',
];

function BlogCard({ post, index }) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 80 }}
      whileHover={{ y: -5 }}
    >
      {/* Thumbnail */}
      <div
        className={styles.thumbnail}
        style={{
          background: post.thumbnail
            ? `url(${post.thumbnail}) center/cover`
            : GRADIENTS[index % GRADIENTS.length],
        }}
      >
        <div className={styles.thumbnailOverlay} />
        {post.tags?.[0] && <span className={styles.tag}>{post.tags[0]}</span>}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.meta}>
          <span className={styles.date}>{post.date}</span>
          <div className={styles.engagement}>
            <span><Heart size={13} /> {post.engagement?.likes ?? 0}</span>
            <span><MessageCircle size={13} /> {post.engagement?.comments ?? 0}</span>
          </div>
        </div>

        <a
          href={post.link ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.readBtn}
        >
          Read on LinkedIn <ExternalLink size={13} />
        </a>
      </div>
    </motion.article>
  );
}

function EmptyCard({ index }) {
  return (
    <motion.div
      className={`${styles.card} ${styles.emptyCard}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <div
        className={styles.thumbnail}
        style={{ background: GRADIENTS[index % GRADIENTS.length], opacity: 0.4 }}
      />
      <div className={styles.content}>
        <div className={styles.skeleton} style={{ width: '80%', height: 14 }} />
        <div className={styles.skeleton} style={{ width: '60%', height: 14, marginTop: 8 }} />
        <div className={styles.skeleton} style={{ width: '90%', height: 10, marginTop: 16 }} />
        <div className={styles.skeleton} style={{ width: '70%', height: 10, marginTop: 6 }} />
      </div>
    </motion.div>
  );
}

export default function BlogSection() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.tags?.includes(activeTag));

  const isEmpty = blogPosts.length === 0;

  return (
    <section id="insights" className={`${styles.section} section`}>
      <div className="container">
        {/* Heading */}
        <div className={styles.headingRow}>
          <div>
            <h2 className="section-heading">Latest <span>Insights</span></h2>
            <p className="section-subtext">Thoughts on engineering, system design &amp; growth.</p>
          </div>
          <a
            href="https://linkedin.com/in/ayushprem"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedinBtn}
          >
            <ExternalLink size={18} /> View on LinkedIn
          </a>
        </div>

        {/* Filter tags */}
        <div className={styles.filters}>
          {blogTags.map(tag => (
            <button
              key={tag}
              className={`${styles.filterBtn} ${activeTag === tag ? styles.active : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isEmpty ? (
          <>
            <div className={styles.emptyMsg}>
              <div className={styles.emptyIcon}>📡</div>
              <p>Loading insights from LinkedIn...</p>
              <span>Content will appear here once the scraper runs.</span>
            </div>
            <div className={styles.grid}>
              {Array.from({ length: 6 }, (_, i) => (
                <EmptyCard key={i} index={i} />
              ))}
            </div>
          </>
        ) : filtered.length === 0 ? (
          <p className={styles.noResults}>No posts found for "{activeTag}".</p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag}
              className={styles.grid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
