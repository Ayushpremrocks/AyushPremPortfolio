import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Timeline from './components/Timeline';
import CodingStats from './components/CodingStats';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingTerminal from './components/FloatingTerminal';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useScrollProgress } from './hooks/useScrollProgress';
import './styles/globals.css';
import './styles/animations.css';

/* ──────────────────────────────────────────────
   Particle Canvas — Konami Easter Egg
────────────────────────────────────────────── */
function ParticleCanvas({ active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      alpha: 1,
      size: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 60 + 130}, 100%, 60%)`,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.012;
        p.vy += 0.1; // gravity
        if (p.alpha <= 0) return;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}
    />
  );
}

/* ──────────────────────────────────────────────
   Konami Flash Overlay
────────────────────────────────────────────── */
function KonamiOverlay({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none',
            background: 'rgba(0, 255, 136, 0.06)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0, 1, 0] }}
          transition={{ duration: 1.5 }}
        />
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────
   App Root
────────────────────────────────────────────── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [hackerMode, setHackerMode] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const scrollProgress = useScrollProgress();
  const showFloat = scrollProgress > 10;

  // Loader — 2s display then fade
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  // Konami Code handler
  const activateKonami = () => {
    setHackerMode(true);
    setKonamiActive(true);
    document.documentElement.setAttribute('data-hacker', 'true');

    // Auto-type "HACKER MODE ACTIVATED" in the terminal
    setTimeout(() => {
      const input = document.querySelector('input[placeholder="type a command..."]');
      if (input) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, 'value'
        ).set;
        nativeInputValueSetter.call(input, 'HACKER MODE ACTIVATED 🟢');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 300);

    // Stop particles after 3s
    setTimeout(() => setKonamiActive(false), 3000);
  };

  useKonamiCode(activateKonami);

  return (
    <>
      <Loader isVisible={loading} />

      {!loading && (
        <>
          <ScrollProgress />
          <KonamiOverlay active={konamiActive} />
          <ParticleCanvas active={konamiActive} />

          <main>
            <Hero hackerMode={hackerMode} />
            <StatsBar />
            <Projects />
            <TechStack />
            <Timeline />
            <CodingStats />
            <BlogSection />
            <Footer />
          </main>

          <FloatingTerminal visible={showFloat} />
        </>
      )}
    </>
  );
}
