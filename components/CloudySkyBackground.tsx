import React, { useRef, useEffect } from 'react';

// --- CONFIGURATION ---
const CLOUD_LAYERS = [
  { count: 12, speed: 0.1, baseSize: 150 }, // Distant, small, slow clouds
  { count: 8, speed: 0.2, baseSize: 250 }, // Mid-ground clouds
  { count: 5, speed: 0.35, baseSize: 400 }, // Foreground, large, fast clouds
];
const GRASSLAND_LAYERS = [
  { color: 'rgba(34, 197, 94, 0.4)', y: 0.85, amplitude: 80, points: 5 }, // Farthest
  { color: 'rgba(22, 163, 74, 0.6)', y: 0.9, amplitude: 100, points: 7 }, // Mid
  { color: 'rgba(21, 128, 61, 0.8)', y: 0.95, amplitude: 120, points: 10 }, // Closest
];
const AEROPLANE_CONFIG = {
  spawnChance: 0.001,
  speed: 3,
  size: 25,
  trailLength: 150,
};

// --- TYPE DEFINITIONS ---
interface Cloud {
  x: number;
  y: number;
  size: number;
  speed: number;
  puffs: { dx: number; dy: number; r: number }[];
}
interface HillPoint {
  x: number;
  y: number;
}
interface GrasslandLayer {
  color: string;
  hills: HillPoint[];
}
interface Aeroplane {
  active: boolean;
  x: number;
  y: number;
  trail: { x: number; y: number }[];
}

const CloudySkyBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const clouds = useRef<Cloud[]>([]);
  const grassland = useRef<GrasslandLayer[]>([]);
  const aeroplane = useRef<Aeroplane>({ active: false, x: 0, y: 0, trail: [] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number;
    let height: number;

    const createCloudPuffs = (size: number) => {
      const puffs = [];
      const puffCount = Math.floor(size / 30) + 6;
      for (let i = 0; i < puffCount; i++) {
        puffs.push({
          dx: (Math.random() - 0.5) * size * 0.9,
          dy: (Math.random() - 0.5) * size * 0.35,
          r: Math.random() * (size / 4) + size / 6,
        });
      }
      return puffs;
    };

    const createCloud = (layer: (typeof CLOUD_LAYERS)[0]): Cloud => {
      const size = layer.baseSize * (Math.random() * 0.5 + 0.75);
      return {
        x: Math.random() * (width + size * 2) - size,
        y: Math.random() * height * 0.55,
        size: size,
        speed: layer.speed * (Math.random() * 0.5 + 0.75),
        puffs: createCloudPuffs(size),
      };
    };

    const createGrassland = () => {
      grassland.current = GRASSLAND_LAYERS.map((layer) => {
        const hillPoints: HillPoint[] = [];
        const hillWidth = width * 1.2;
        const segmentWidth = hillWidth / (layer.points - 1);
        for (let i = 0; i < layer.points; i++) {
          hillPoints.push({
            x: i * segmentWidth - width * 0.1,
            y: height * layer.y - Math.random() * layer.amplitude,
          });
        }
        return { color: layer.color, hills: hillPoints };
      });
    };

    const spawnAeroplane = () => {
      if (aeroplane.current.active) return;
      aeroplane.current = {
        active: true,
        x: -AEROPLANE_CONFIG.size,
        y: Math.random() * height * 0.2 + height * 0.05,
        trail: [],
      };
    };

    const drawGrassland = () => {
      grassland.current.forEach((layer) => {
        ctx.fillStyle = layer.color;
        ctx.beginPath();
        ctx.moveTo(-5, height + 5);
        ctx.lineTo(-5, layer.hills[0].y);

        let p1 = layer.hills[0];
        let p2 = layer.hills[1];
        ctx.lineTo(p1.x, p1.y);

        for (let i = 1; i < layer.hills.length - 1; i++) {
          const midPoint = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
          ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
          p1 = layer.hills[i];
          p2 = layer.hills[i + 1];
        }
        ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);

        ctx.lineTo(width + 5, p2.y);
        ctx.lineTo(width + 5, height + 5);
        ctx.closePath();
        ctx.fill();
      });
    };

    const drawCloud = (cloud: Cloud) => {
      cloud.puffs.forEach((puff) => {
        const puffX = cloud.x + puff.dx;
        const puffY = cloud.y + puff.dy;
        const puffR = puff.r;
        const gradient = ctx.createRadialGradient(
          puffX,
          puffY,
          puffR * 0.2,
          puffX,
          puffY,
          puffR
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.7, 'rgba(245, 245, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(220, 220, 230, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(puffX, puffY, puffR, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawAeroplane = () => {
      const plane = aeroplane.current;
      const config = AEROPLANE_CONFIG;

      if (plane.trail.length > 1) {
        const gradient = ctx.createLinearGradient(
          plane.trail[0].x,
          plane.trail[0].y,
          plane.x,
          plane.y
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.6)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(plane.trail[0].x, plane.trail[0].y);
        plane.trail.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      }

      ctx.fillStyle = '#E0E0E0';
      ctx.strokeStyle = '#A0A0A0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(plane.x, plane.y);
      ctx.lineTo(plane.x - config.size, plane.y + config.size / 4);
      ctx.lineTo(plane.x - config.size, plane.y - config.size / 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const init = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
      clouds.current = [];
      CLOUD_LAYERS.forEach((layer) => {
        const responsiveCount = Math.max(
          2,
          Math.floor((layer.count * width) / 1920)
        );
        for (let i = 0; i < responsiveCount; i++) {
          clouds.current.push(createCloud(layer));
        }
      });
      createGrassland();
      aeroplane.current.active = false;
    };

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      if (!ctx) return;

      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, '#87CEEB');
      skyGradient.addColorStop(0.6, '#B0E0E6');
      skyGradient.addColorStop(1, '#E0F2FE');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      drawGrassland();

      clouds.current.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x - cloud.size > width) {
          cloud.x = -cloud.size * 2;
          cloud.y = Math.random() * height * 0.55;
        }
        drawCloud(cloud);
      });

      if (Math.random() < AEROPLANE_CONFIG.spawnChance) {
        spawnAeroplane();
      }

      if (aeroplane.current.active) {
        const plane = aeroplane.current;
        plane.x += AEROPLANE_CONFIG.speed;
        plane.trail.push({ x: plane.x, y: plane.y });
        if (plane.trail.length > AEROPLANE_CONFIG.trailLength) {
          plane.trail.shift();
        }
        drawAeroplane();
        if (plane.x > width + AEROPLANE_CONFIG.trailLength) {
          plane.active = false;
        }
      }
    };

    init();
    animate();

    window.addEventListener('resize', init);

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 -z-10 h-[100dvh] w-full'></canvas>
  );
});

export default CloudySkyBackground;
