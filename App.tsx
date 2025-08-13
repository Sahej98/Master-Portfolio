import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useTheme } from './contexts/ThemeContext';
import CloudySkyBackground from './components/CloudySkyBackground';

const CosmosBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number;
    let height: number;
    let stars: Star[] = [];
    let nebulas: Nebula[] = [];
    let planets: Planet[] = [];
    let meteors: Meteor[] = [];
    let dustParticles: DustParticle[] = [];

    // --- Configuration ---
    const STAR_COLORS = [
      '#FFFFFF',
      '#AEC6CF',
      '#FFD700',
      '#FFB347',
      '#ff8fab',
      '#ff4d6d',
      '#8ecae6',
    ]; // White, Pastel Blue, Gold, Orange, Pink, Red, Light Blue
    const STAR_LAYERS = [
      { count: 1200, radius: 0.5, speed: 0.06, alpha: 0.5 }, // More tiny, distant stars
      { count: 500, radius: 0.9, speed: 0.11, alpha: 0.8 }, // More tiny, mid stars
      { count: 200, radius: 1.3, speed: 0.16, alpha: 1.0 }, // More small, near stars
      { count: 80, radius: 2.0, speed: 0.22, alpha: 1.0 }, // More big, closest stars
    ];
    const NEBULA_COUNT = 8;
    const NEBULA_COLORS = [
      'rgba(59, 130, 246, 0.12)', // Prominent Blue
      'rgba(244, 114, 182, 0.1)', // Prominent Pink
      'rgba(34, 211, 238, 0.11)', // Prominent Cyan
      'rgba(168, 85, 247, 0.09)', // Purple (blend of pink/blue)
    ];
    const PLANET_COUNT = 7;
    const PLANET_COLORS = [
      '#264653',
      '#2a9d8f',
      '#e9c46a',
      '#f4a261',
      '#e76f51',
      '#4a4e69',
      '#6a0dad',
      '#0077b6',
      '#9d4edd',
    ];
    const METEOR_SPAWN_RATE = 0.025;
    const DUST_PARTICLE_COUNT = 1000; // More dust particles for depth

    interface Star {
      x: number;
      y: number;
      radius: number;
      baseRadius: number;
      vx: number;
      vy: number;
      color: string;
      twinkleOffset: number;
      twinkleSpeed: number;
    }
    interface Nebula {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
    }
    interface Planet {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
    }
    interface Meteor {
      x: number;
      y: number;
      len: number;
      angle: number;
      speed: number;
      life: number;
      ttl: number;
    }
    interface DustParticle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    const createStar = (layerIndex: number): Star => {
      const layer = STAR_LAYERS[layerIndex];
      const colorHex =
        STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      const colorRgb = hexToRgb(colorHex);
      const colorString = colorRgb
        ? `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${layer.alpha})`
        : `rgba(255,255,255,${layer.alpha})`;
      const baseRadius = layer.radius * (Math.random() * 0.5 + 0.75);

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: baseRadius,
        radius: baseRadius,
        vx: (Math.random() - 0.5) * layer.speed,
        vy: (Math.random() - 0.5) * layer.speed,
        color: colorString,
        twinkleOffset: Math.random() * 2 * Math.PI,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      };
    };

    const createNebula = (): Nebula => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (width / 2.5) + width / 3,
      color: NEBULA_COLORS[Math.floor(Math.random() * NEBULA_COLORS.length)],
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
    });

    const createPlanet = (): Planet => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 15 + 5,
      color: PLANET_COLORS[Math.floor(Math.random() * PLANET_COLORS.length)],
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14,
    });

    const createMeteor = (): Meteor => {
      const edge = Math.floor(Math.random() * 4);
      const meteor: Meteor = {
        x: 0,
        y: 0,
        len: Math.random() * 150 + 50,
        angle: 0,
        speed: Math.random() * 8 + 7,
        life: 100,
        ttl: 100,
      };
      switch (edge) {
        case 0:
          meteor.x = Math.random() * width;
          meteor.y = -meteor.len;
          meteor.angle = Math.random() * (Math.PI * 0.5) + Math.PI * 0.25;
          break;
        case 1:
          meteor.x = width + meteor.len;
          meteor.y = Math.random() * height;
          meteor.angle = Math.random() * (Math.PI * 0.5) + Math.PI * 0.75;
          break;
        case 2:
          meteor.x = Math.random() * width;
          meteor.y = height + meteor.len;
          meteor.angle = Math.random() * (Math.PI * 0.5) + Math.PI * 1.25;
          break;
        case 3:
          meteor.x = -meteor.len;
          meteor.y = Math.random() * height;
          meteor.angle = Math.random() * (Math.PI * 0.5) - Math.PI * 0.25;
          break;
      }
      return meteor;
    };

    const createDustParticle = (): DustParticle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 0.6 + 0.2, // very small
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      alpha: Math.random() * 0.3 + 0.1,
    });

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = [];
      nebulas = [];
      planets = [];
      meteors = [];
      dustParticles = [];

      STAR_LAYERS.forEach((layer, index) => {
        const responsiveCount = Math.floor(
          (layer.count * (width * height)) / (1920 * 1080)
        );
        for (let i = 0; i < responsiveCount; i++) stars.push(createStar(index));
      });
      for (let i = 0; i < NEBULA_COUNT; i++) nebulas.push(createNebula());
      for (let i = 0; i < PLANET_COUNT; i++) planets.push(createPlanet());

      const responsiveDustCount = Math.floor(
        (DUST_PARTICLE_COUNT * (width * height)) / (1920 * 1080)
      );
      for (let i = 0; i < responsiveDustCount; i++)
        dustParticles.push(createDustParticle());
    };

    const updateAndDrawItem = (item: Star | Planet | Nebula | DustParticle) => {
      item.x += item.vx;
      item.y += item.vy;
      const wrapMargin = item.radius * 2;
      if (item.x < -wrapMargin) item.x = width + wrapMargin;
      if (item.x > width + wrapMargin) item.x = -wrapMargin;
      if (item.y < -wrapMargin) item.y = height + wrapMargin;
      if (item.y > height + wrapMargin) item.y = -wrapMargin;
    };

    const updateAndDrawStar = (s: Star) => {
      updateAndDrawItem(s);
      s.radius = s.baseRadius;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.shadowBlur = 0;

      const baseAlphaMatch = s.color.match(/, ([\d.]+)\)/);
      if (baseAlphaMatch) {
        const baseAlpha = parseFloat(baseAlphaMatch[1]);
        const twinkleFactor =
          ((Math.sin(time.current * s.twinkleSpeed + s.twinkleOffset) + 1) /
            2) *
            0.7 +
          0.3;
        const currentAlpha = baseAlpha * twinkleFactor;
        ctx.fillStyle = s.color.replace(
          /, [\d.]+\)/,
          `, ${currentAlpha.toFixed(3)})`
        );
      } else {
        ctx.fillStyle = s.color;
      }

      ctx.fill();
    };

    const updateAndDrawNebula = (n: Nebula) => {
      updateAndDrawItem(n);
      ctx.save();
      const gradient = ctx.createRadialGradient(
        n.x,
        n.y,
        0,
        n.x,
        n.y,
        n.radius
      );
      gradient.addColorStop(0, n.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = gradient;
      ctx.fillRect(n.x - n.radius, n.y - n.radius, n.radius * 2, n.radius * 2);
      ctx.restore();
    };

    const updateAndDrawPlanet = (p: Planet) => {
      updateAndDrawItem(p);
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.radius * 2.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const updateAndDrawMeteor = (m: Meteor) => {
      m.x += Math.cos(m.angle) * m.speed;
      m.y += Math.sin(m.angle) * m.speed;
      m.life--;
      const opacity = Math.max(0, m.life / m.ttl);
      const tailX = m.x - Math.cos(m.angle) * m.len;
      const tailY = m.y - Math.sin(m.angle) * m.len;
      const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(0.7, `rgba(174, 198, 207, ${opacity * 0.4})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    };

    const updateAndDrawDustParticle = (p: DustParticle) => {
      updateAndDrawItem(p);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 200, 220, ${p.alpha})`;
      ctx.fill();
    };

    window.addEventListener('resize', init);

    const animate = () => {
      if (!ctx) return;
      animationFrameId.current = requestAnimationFrame(animate);
      time.current += 1;
      ctx.clearRect(0, 0, width, height);

      if (Math.random() < METEOR_SPAWN_RATE) meteors.push(createMeteor());
      meteors = meteors.filter((m) => m.life > 0);

      nebulas.forEach(updateAndDrawNebula);
      dustParticles.forEach(updateAndDrawDustParticle);
      planets.forEach(updateAndDrawPlanet);
      stars.forEach(updateAndDrawStar);
      meteors.forEach(updateAndDrawMeteor);
    };

    init();
    animate();

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 -z-10 h-full w-full bg-gray-950'></canvas>
  );
});

const App = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className='relative z-0 bg-white dark:bg-gray-950'>
        {theme === 'dark' && <CosmosBackground />}
        {theme === 'light' && <CloudySkyBackground />}
        <div className='relative z-10'>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
