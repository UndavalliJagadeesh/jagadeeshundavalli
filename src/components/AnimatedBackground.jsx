import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const starsRef = useRef([]);
    const shootingRef = useRef([]);
    const birdsRef = useRef([]);
    const cloudsRef = useRef([]);
    const animationRef = useRef(null);
    const { theme } = useTheme();

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
        const BIRD_SPAWN_PROB = 0.08;

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
            generateClouds();
        };

        const spawnShootingStar = () => {
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight * 0.45;
            const len = Math.random() * 360 + 260;
            const speed = Math.random() * 10 + 10;
            const angle = Math.PI * 0.9 + (Math.random() * 0.35 - 0.175);
            shootingRef.current.push({ x: startX, y: startY, len, speed, angle, life: 1 });
        };

        const spawnBird = () => {
            const startY = Math.random() * window.innerHeight * 0.7 + 50;
            const speed = Math.random() * 1.5 + 1;
            const size = Math.random() * 0.5 + 0.7;
            const wingPhase = Math.random() * Math.PI * 2;
            birdsRef.current.push({
                x: -30,
                y: startY,
                speed,
                size,
                wingPhase,
                wingSpeed: Math.random() * 0.1 + 0.15
            });
        };

        const generateClouds = () => {
            cloudsRef.current = [];
            const cloudCount = Math.floor(Math.random() * 3) + 3; // 3-5 clouds
            for (let i = 0; i < cloudCount; i++) {
                cloudsRef.current.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight * 0.5 + 50,
                    width: Math.random() * 100 + 80,
                    height: Math.random() * 40 + 30,
                    speed: Math.random() * 0.3 + 0.1,
                    opacity: Math.random() * 0.3 + 0.5
                });
            }
        };

        const drawCloud = (cloud) => {
            const { x, y, width, height, opacity } = cloud;

            ctx.fillStyle = `rgba(180, 180, 180, ${opacity})`;

            // Define circle radii
            const r1 = height * 0.5;
            const r2 = height * 0.6;
            const r3 = height * 0.55;
            const r4 = height * 0.5;
            const r5 = height * 0.45;

            // Calculate positions ensuring 35% overlap
            // For 35% overlap: distance = (r1 + r2) * 0.65
            const x1 = x;
            const x2 = x1 + (r1 + r2) * 0.65;
            const x3 = x2 + (r2 + r3) * 0.65;
            const x4 = x3 + (r3 + r4) * 0.65;
            const x5 = x4 + (r4 + r5) * 0.65;

            // Draw cloud using multiple circles with proper overlap
            ctx.beginPath();
            ctx.arc(x1, y, r1, 0, Math.PI * 2);
            ctx.arc(x2, y - height * 0.2, r2, 0, Math.PI * 2);
            ctx.arc(x3, y, r3, 0, Math.PI * 2);
            ctx.arc(x4, y - height * 0.15, r4, 0, Math.PI * 2);
            ctx.arc(x5, y, r5, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawSun = () => {
            const sunX = window.innerWidth - 100;
            const sunY = 100;
            const sunRadius = 50;

            // Sun glow
            const gradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 2);
            gradient.addColorStop(0, 'rgba(255, 220, 100, 0.4)');
            gradient.addColorStop(0.5, 'rgba(255, 200, 80, 0.2)');
            gradient.addColorStop(1, 'rgba(255, 180, 60, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(sunX, sunY, sunRadius * 2, 0, Math.PI * 2);
            ctx.fill();

            // Sun core
            ctx.fillStyle = '#FFD93D';
            ctx.beginPath();
            ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
            ctx.fill();

            // Sun rays
            const time = Date.now() / 1000;
            for (let i = 0; i < 12; i++) {
                const angle = (i * Math.PI * 2) / 12 + time * 0.2;
                const x1 = sunX + Math.cos(angle) * (sunRadius + 5);
                const y1 = sunY + Math.sin(angle) * (sunRadius + 5);
                const x2 = sunX + Math.cos(angle) * (sunRadius + 20);
                const y2 = sunY + Math.sin(angle) * (sunRadius + 20);

                ctx.strokeStyle = 'rgba(255, 217, 61, 0.7)';
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        };

        const drawBird = (bird) => {
            const { x, y, size, wingPhase } = bird;
            const wingAngle = Math.sin(wingPhase) * 0.5;

            ctx.strokeStyle = 'rgba(50, 50, 50, 0.7)';
            ctx.lineWidth = 2 * size;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // Left wing
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(
                x - 15 * size,
                y - 15 * size - wingAngle * 20,
                x - 25 * size,
                y - 5 * size - wingAngle * 15
            );
            ctx.stroke();

            // Right wing
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(
                x + 15 * size,
                y - 15 * size - wingAngle * 20,
                x + 25 * size,
                y - 5 * size - wingAngle * 15
            );
            ctx.stroke();
        };

        const animateDarkMode = () => {
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
        };

        const animateLightMode = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Update and draw clouds
            cloudsRef.current.forEach((cloud) => {
                cloud.x += cloud.speed;
                // Wrap around
                if (cloud.x > window.innerWidth + cloud.width) {
                    cloud.x = -cloud.width;
                }
                drawCloud(cloud);
            });

            // Draw sun
            drawSun();

            // Update and draw birds
            birdsRef.current = birdsRef.current.filter((bird) => {
                bird.x += bird.speed;
                bird.wingPhase += bird.wingSpeed;

                if (bird.x > window.innerWidth + 50) return false;

                drawBird(bird);
                return true;
            });

            // Spawn birds randomly
            if (Math.random() < BIRD_SPAWN_PROB / 60) {
                spawnBird();
            }
        };

        const animate = () => {
            if (theme === 'light') {
                animateLightMode();
            } else {
                animateDarkMode();
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
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            id="background-canvas"
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

export default AnimatedBackground;
