import { useEffect, useRef } from 'react';

const Starfield = () => {
    const canvasRef = useRef(null);
    const starsRef = useRef([]);
    const shootingRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let DPR = Math.max(1, window.devicePixelRatio || 1);

        // Configuration
        const STAR_DENSITY = 1.8;
        const STAR_BRIGHTNESS_MIN = 0.45;
        const STAR_BRIGHTNESS_MAX = 1.0;
        const STAR_TWINKLE_MIN = 0.004;
        const STAR_TWINKLE_MAX = 0.035;
        const SHOOTING_SPAWN_PROB = 0.07;

        const generateStars = () => {
            starsRef.current = [];
            const baseCount = Math.floor((window.innerWidth * window.innerHeight) / 12000);
            const STAR_COUNT = Math.max(30, Math.floor(baseCount * STAR_DENSITY));

            for (let i = 0; i < STAR_COUNT; i++) {
                starsRef.current.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    r: Math.random() * 1.4 + 0.3,
                    a: Math.random() * (STAR_BRIGHTNESS_MAX - STAR_BRIGHTNESS_MIN) + STAR_BRIGHTNESS_MIN,
                    tw: Math.random() * (STAR_TWINKLE_MAX - STAR_TWINKLE_MIN) + STAR_TWINKLE_MIN,
                });
            }
        };

        const resizeCanvas = () => {
            DPR = Math.max(1, window.devicePixelRatio || 1);
            canvas.width = Math.floor(window.innerWidth * DPR);
            canvas.height = Math.floor(window.innerHeight * DPR);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            generateStars();
        };

        const spawnShootingStar = () => {
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight * 0.45;
            const len = Math.random() * 360 + 260;
            const speed = Math.random() * 10 + 10;
            const angle = Math.PI * 0.9 + (Math.random() * 0.35 - 0.175);
            shootingRef.current.push({ x: startX, y: startY, len, speed, angle, life: 1 });
        };

        const animate = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Draw static stars with twinkling
            starsRef.current.forEach((s) => {
                s.a += s.tw;
                if (s.a > STAR_BRIGHTNESS_MAX || s.a < STAR_BRIGHTNESS_MIN) s.tw = -s.tw;
                ctx.fillStyle = `rgba(255,255,255,${s.a})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Update and draw shooting stars
            shootingRef.current = shootingRef.current.filter((sh) => {
                sh.life -= 0.01;
                if (sh.life <= 0) return false;

                const dx = Math.cos(sh.angle) * sh.speed;
                const dy = Math.sin(sh.angle) * sh.speed;
                sh.x += dx;
                sh.y += dy;

                const gradient = ctx.createLinearGradient(
                    sh.x,
                    sh.y,
                    sh.x - Math.cos(sh.angle) * sh.len,
                    sh.y - Math.sin(sh.angle) * sh.len
                );
                gradient.addColorStop(0, `rgba(200,220,255,${sh.life * 0.8})`);
                gradient.addColorStop(1, 'rgba(200,220,255,0)');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(sh.x, sh.y);
                ctx.lineTo(sh.x - Math.cos(sh.angle) * sh.len, sh.y - Math.sin(sh.angle) * sh.len);
                ctx.stroke();

                return true;
            });

            // Spawn shooting stars randomly
            if (Math.random() < SHOOTING_SPAWN_PROB / 60) {
                spawnShootingStar();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="stars-canvas"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default Starfield;
