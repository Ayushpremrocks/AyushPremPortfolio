import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import styles from './FloatingTerminal.module.css';

export default function FloatingTerminal({ visible }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Also focus the terminal input after scrolling
    setTimeout(() => {
      const input = document.querySelector('input[placeholder="type a command..."]');
      if (input) input.focus();
    }, 700);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={styles.btn}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Back to terminal"
        >
          <motion.div
            className={styles.icon}
            whileHover={{ rotate: 15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Terminal size={22} />
          </motion.div>
          <span className={styles.tooltip}>Back to Terminal</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
