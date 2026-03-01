import { useEffect, useRef } from 'react';

const AntigravityBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Rotation State
        let currentRotationX = 0;
        let currentRotationY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        const mouse = { x: undefined, y: undefined };

        // 3D Config
        const PARTICLE_COUNT = 1500; // Increased density for "Starfield" look
        const SPHERE_RADIUS = 300;
        const FOCAL_LENGTH = 400;

        class Particle3D {
            constructor(x, y, z, color) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.baseX = x;
                this.baseY = y;
                this.baseZ = z;
                this.color = color;
                this.size = 1.5;

                // Drift Velocity ("Noise")
                this.drift = {
                    x: (Math.random() - 0.5) * 0.2,
                    y: (Math.random() - 0.5) * 0.2,
                    z: (Math.random() - 0.5) * 0.2
                };

                // Life cycle for fade in/out (Jellyfish effect)
                this.life = Math.random() * 200; // Start at random life stage
                this.maxLife = 200;
                this.lifeSpeed = 0.5 + Math.random() * 0.5;

                // Shape morphing parameters
                this.morphPhase = Math.random() * Math.PI * 2;
                this.morphSpeed = 0.02 + Math.random() * 0.02;
            }

            // Apply rotation matrix
            rotate(rotationX, rotationY) {
                // Apply Drift to Base Position first
                this.baseX += this.drift.x;
                this.baseY += this.drift.y;
                this.baseZ += this.drift.z;

                // Keep them loosely in the sphere/volume
                const bounds = SPHERE_RADIUS * 2.5; // Looser bounds for expanded swarm
                if (Math.abs(this.baseX) > bounds) this.baseX *= -0.9;
                if (Math.abs(this.baseY) > bounds) this.baseY *= -0.9;
                if (Math.abs(this.baseZ) > bounds) this.baseZ *= -0.9;

                // Rotate around Y-axis (Yaw)
                let cosY = Math.cos(rotationY);
                let sinY = Math.sin(rotationY);
                let x1 = this.baseX * cosY - this.baseZ * sinY;
                let z1 = this.baseZ * cosY + this.baseX * sinY;

                // Rotate around X-axis (Pitch)
                let cosX = Math.cos(rotationX);
                let sinX = Math.sin(rotationX);
                let y2 = this.baseY * cosX - z1 * sinX;
                let z2 = z1 * cosX + this.baseY * sinX;

                this.x = x1;
                this.y = y2;
                this.z = z2;

                // Update life cycle (fade in/out)
                this.life += this.lifeSpeed;
                if (this.life > this.maxLife) {
                    this.life = 0;
                }

                // Update morph phase
                this.morphPhase += this.morphSpeed;
            }

            draw(centerX, centerY) {
                // Perspective Projection
                // Scale factor based on Z depth (closer = larger)
                // We add SPHERE_RADIUS * 1.5 to Z to move the camera back so we see the whole sphere
                // Or standard: scale = focal / (focal + z + cameraZ)
                const cameraZ = SPHERE_RADIUS + 200;
                const scale = FOCAL_LENGTH / (FOCAL_LENGTH + this.z + cameraZ);

                if (scale < 0) return; // Behind camera (clipped)

                const x2d = this.x * scale + centerX;
                const y2d = this.y * scale + centerY;

                // Visual Styling
                // Size changes with depth (Parallax)
                const projectedSize = this.size * scale * 2;

                // Opacity/Brightness changes with depth
                // Map Z from [-radius, radius] to [0.1, 1] alpha
                // Front (negative Z in some systems, but here Z+ is often back? Let's check logic)
                // In our logic: z1 = baseZ * cos + ...
                // Usually z > 0 is further away for perspective division?
                // Scale formula above: FOCAL / (FOCAL + z + camZ).
                // If z is large positive -> scale is small -> further away.
                // So max opacity at smallest Z (closest).

                // Depth Fading
                const minZ = -SPHERE_RADIUS * 1.5;
                const maxZ = SPHERE_RADIUS * 1.5;

                let opacity = 1 - ((this.z - minZ) / (maxZ - minZ));
                opacity = 0.1 + (opacity * 0.9);
                opacity = Math.max(0.1, Math.min(1, opacity));

                ctx.fillStyle = this.color.replace('ALPHA', opacity.toFixed(2));

                ctx.beginPath();
                ctx.arc(x2d, y2d, projectedSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Swarm Position State
        let swarmX = width / 2;
        let swarmY = height / 2;

        const getParticleColor = () => {
            const theme = document.documentElement.getAttribute('data-theme');
            return theme === 'light'
                ? `rgba(37, 99, 235, ALPHA)`   // deeper blue for light bg
                : `rgba(0, 150, 255, ALPHA)`;   // glowing cyan/blue for dark bg
        };

        const initParticles = () => {
            particles = [];
            const baseRadius = Math.max(width, height) * 0.4;
            const color = getParticleColor();

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const r = baseRadius * (0.2 + Math.random() * 0.8);
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);

                let x = r * Math.sin(phi) * Math.cos(theta);
                let y = r * Math.sin(phi) * Math.sin(theta);
                let z = r * Math.cos(phi);

                x *= 1.8;
                y *= 1.2;
                z *= 1.5;

                particles.push(new Particle3D(x, y, z, color));
            }
        };

        // Re-init particles on theme change
        const themeObserver = new MutationObserver(() => {
            const newColor = getParticleColor();
            particles.forEach(p => p.color = newColor);
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const updateRotation = () => {
            // Map mouse X/Y to rotation angles
            // Center is (width/2, height/2)
            // Range: -PI to PI or similar
            if (mouse.x !== undefined && mouse.y !== undefined) {
                const xPct = (mouse.x / width) - 0.5; // -0.5 to 0.5
                const yPct = (mouse.y / height) - 0.5;

                // Sensitivity
                targetRotationY = xPct * Math.PI; // Full rotation range
                targetRotationX = -yPct * Math.PI;
            } else {
                // Auto rotate if no mouse
                targetRotationY += 0.002;
            }

            // Smooth Lerp
            const lerpSpeed = 0.05;
            currentRotationX += (targetRotationX - currentRotationX) * lerpSpeed;
            currentRotationY += (targetRotationY - currentRotationY) * lerpSpeed;
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);

            // 1. Follow Mouse Logic (Smooth Lerp)
            if (mouse.x !== undefined && mouse.y !== undefined) {
                // Lerp swarm center towards mouse
                const followSpeed = 0.08;
                swarmX += (mouse.x - swarmX) * followSpeed;
                swarmY += (mouse.y - swarmY) * followSpeed;
            }

            // Center of projection is now the Swarm Center
            const centerX = swarmX;
            const centerY = swarmY;

            updateRotation();

            // 2. Update/Rotate all positions
            particles.forEach(p => p.rotate(currentRotationX, currentRotationY));

            // 3. Sort by Z depth
            particles.sort((a, b) => b.z - a.z);

            // 4. Draw
            particles.forEach(p => p.draw(centerX, centerY));
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        // Handle touch
        window.addEventListener('touchmove', (e) => {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        });

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            themeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                // Background handled by CSS (body { background: var(--bg-dark) })
                background: 'transparent'
            }}
        />
    );
};

export default AntigravityBackground;
