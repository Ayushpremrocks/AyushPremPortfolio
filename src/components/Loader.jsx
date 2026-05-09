import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';

export default function Loader({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        >
          {/* Animated grid lines */}
          <div className={styles.grid} />

          {/* Center logo */}
          <motion.div
            className={styles.logo}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
          >
            <motion.div
              className={styles.logoBox}
              animate={{ boxShadow: [
                '0 0 20px rgba(0, 255, 242, 0.3)',
                '0 0 60px rgba(0, 255, 242, 0.7)',
                '0 0 20px rgba(0, 255, 242, 0.3)',
              ]}}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className={styles.logoText}>AP</span>
              <span className={styles.cursor}>_</span>
            </motion.div>

            <motion.div
              className={styles.loadingBar}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />

            <motion.p
              className={styles.loadingText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Initializing portfolio<span className={styles.dots}>...</span>
            </motion.p>
          </motion.div>

          {/* Scan line effect */}
          <div className={styles.scanLine} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
