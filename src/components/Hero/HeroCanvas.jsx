import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Ambient Particles ── */
function Particles({ count = 2000 }) {
  const mesh = useRef();
  const { viewport, pointer } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;     // x: -10 to 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;  // y: -10 to 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;  // z: -5 to 5
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();

    // Gentle rotation
    mesh.current.rotation.y = t * 0.02;
    mesh.current.rotation.x = Math.sin(t * 0.01) * 0.05;

    // Mouse reaction — lerp toward pointer
    const targetX = pointer.x * viewport.width * 0.3 * 0.2;
    const targetY = pointer.y * viewport.height * 0.3 * 0.2;
    mesh.current.position.x += (targetX - mesh.current.position.x) * 0.02;
    mesh.current.position.y += (targetY - mesh.current.position.y) * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#FFFFFF"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Floating Wireframe Icosahedron ── */
function FloatingMesh() {
  const mesh = useRef();
  const { viewport, pointer } = useThree();

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    
    // Smoothly rotate based on time + pointer position
    const targetRotX = t * 0.1 + (pointer.y * 0.8);
    const targetRotY = t * 0.15 + (pointer.x * 0.8);
    
    mesh.current.rotation.x += (targetRotX - mesh.current.rotation.x) * 0.1;
    mesh.current.rotation.y += (targetRotY - mesh.current.rotation.y) * 0.1;
    
    // Bobbing + subtle parallax movement
    const targetPosX = 4 + pointer.x * viewport.width * 0.05;
    const targetPosY = 1 + Math.sin(t * 0.3) * 0.5 + pointer.y * viewport.height * 0.05;
    
    mesh.current.position.x += (targetPosX - mesh.current.position.x) * 0.05;
    mesh.current.position.y += (targetPosY - mesh.current.position.y) * 0.05;
  });

  return (
    <mesh ref={mesh} position={[4, 1, -3]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial
        color="#F5F5DC"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

/* ── Canvas Wrapper ── */
export default function HeroCanvas() {
  // Determine mobile status for performance adjustments
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // WebGL causes massive battery drain and framerate drops on mobile devices.
  // Completely disable the canvas on mobile for a silky smooth 60 FPS experience.
  if (isMobile) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <Particles count={2000} />
      <FloatingMesh />
    </Canvas>
  );
}
