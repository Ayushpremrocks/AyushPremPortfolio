import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import styles from './Terminal.module.css';

const COMMANDS = {
  help: {
    output: [
      '  Available commands:',
      '',
      '  whoami       → About me',
      '  stack        → Jump to Tech Stack',
      '  projects     → Jump to Projects',
      '  experience   → Jump to Timeline',
      '  insights     → Jump to Blog',
      '  contact      → Jump to Contact',
      '  clear        → Clear terminal',
      '',
      '  Type any command and press Enter ↵',
    ],
  },
  whoami: {
    output: [
      '  Ayush Prem',
      '  Full-Stack Developer & CS Student',
      '',
      '  📍 Chandigarh University, 2023–2027',
      '  ⚡ Passionate about scalable systems',
      '  🏆 Tekathon 4.0 Winner',
      '  🔭 Currently exploring: Kafka, AWS, Microservices',
    ],
  },
  stack:      { scroll: 'tech-stack', output: ['  Scrolling to Tech Stack...'] },
  projects:   { scroll: 'projects',   output: ['  Scrolling to Projects...'] },
  experience: { scroll: 'experience', output: ['  Scrolling to Experience...'] },
  insights:   { scroll: 'insights',   output: ['  Scrolling to Latest Insights...'] },
  contact:    { scroll: 'contact',    output: ['  Scrolling to Contact...'] },
  clear:      { clear: true },
};

const BOOT_LINES = [
  '> Booting portfolio v2.0...',
  '> Loading components... ✓',
  '> Connecting to servers... ✓',
  '> Ready.',
  '',
  '  Type "help" to see available commands.',
];

export default function Terminal({ hackerMode }) {
  const [history, setHistory] = useState([]);     // { type: 'input'|'output', lines: string[] }
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  // Boot sequence
  useEffect(() => {
    let lines = [];
    let i = 0;
    const timer = setInterval(() => {
      if (i < BOOT_LINES.length) {
        lines = [...lines, BOOT_LINES[i]];
        setHistory([{ type: 'output', lines: [...lines] }]);
        i++;
      } else {
        clearInterval(timer);
        setBooted(true);
      }
    }, 180);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add to command history
    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);

    const inputEntry = { type: 'input', lines: [`$ ${trimmed}`] };

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const def = COMMANDS[trimmed];
    if (!def) {
      setHistory(prev => [
        ...prev,
        inputEntry,
        { type: 'error', lines: [`  Command not found: "${trimmed}". Type "help" for available commands.`] },
      ]);
      return;
    }

    if (def.scroll) {
      const el = document.getElementById(def.scroll);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setHistory(prev => [
      ...prev,
      inputEntry,
      { type: 'output', lines: def.output },
    ]);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? '' : cmdHistory[newIdx]);
    }
  };

  const copyOutput = () => {
    const text = history
      .flatMap(e => e.lines)
      .join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`${styles.terminal} ${hackerMode ? styles.hacker : ''}`}>
      {/* Title bar */}
      <div className={styles.titleBar}>
        <div className={styles.dots}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`} />
        </div>
        <span className={styles.title}>ayush@portfolio:~</span>
        <button
          className={styles.copyBtn}
          onClick={copyOutput}
          title="Copy output"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      {/* Output area */}
      <div className={styles.output} ref={outputRef}>
        {history.map((entry, i) => (
          <div key={i} className={styles[entry.type] ?? styles.output}>
            {entry.lines.map((line, j) => (
              <div key={j} className={styles.line}>
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Input row */}
      {booted && (
        <div className={styles.inputRow}>
          <span className={styles.prompt}>$</span>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            placeholder="type a command..."
          />
          <span className={styles.cursor} />
        </div>
      )}
    </div>
  );
}
