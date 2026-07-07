import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, RoundedBox, Sphere, Torus, TorusKnot, Icosahedron, ContactShadows } from '@react-three/drei';

function GoogleReviewModel() {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <TorusKnot args={[1, 0.3, 256, 32]}>
        <meshPhysicalMaterial 
          color="#F5A623" 
          metalness={1} 
          roughness={0.1} 
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </TorusKnot>
    </Float>
  );
}

function NFCTapModel() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group rotation={[0.2, -0.4, 0]}>
        <RoundedBox args={[2, 3.2, 0.1]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial 
            color="#111111" 
            metalness={0.8} 
            roughness={0.2} 
            clearcoat={1}
          />
        </RoundedBox>
        {/* Simulating a glowing chip or NFC logo on the card */}
        <mesh position={[0, 0, 0.06]}>
          <circleGeometry args={[0.4, 32]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>
    </Float>
  );
}

function PresenceGrowModel() {
  const rings = useRef();
  
  useFrame((state) => {
    if (rings.current) {
      rings.current.rotation.x = state.clock.elapsedTime * 0.2;
      rings.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <group>
        <Sphere args={[1.2, 32, 32]}>
          <meshPhysicalMaterial 
            color="#3b82f6" 
            metalness={0.7} 
            roughness={0.2} 
            wireframe 
            emissive="#1e3a8a"
            emissiveIntensity={0.5}
          />
        </Sphere>
        <group ref={rings}>
          <Torus args={[1.8, 0.02, 16, 100]} rotation={[Math.PI / 2, 0.2, 0]}>
            <meshBasicMaterial color="#00ffcc" />
          </Torus>
          <Torus args={[2.2, 0.02, 16, 100]} rotation={[Math.PI / 3, -0.4, 0]}>
            <meshBasicMaterial color="#ff00cc" />
          </Torus>
        </group>
      </group>
    </Float>
  );
}

function DesignWebModel() {
  const innerRef = useRef();

  useFrame((state) => {
    if (innerRef.current) {
      innerRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      innerRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
      <group>
        {/* Glass Sphere */}
        <Sphere args={[1.4, 64, 64]}>
          <meshPhysicalMaterial 
            transmission={1} 
            ior={1.5} 
            thickness={1} 
            roughness={0} 
            envMapIntensity={2}
            color="#ffffff"
            clearcoat={1}
          />
        </Sphere>
        {/* Inner glowing element */}
        <Icosahedron args={[0.8, 0]} ref={innerRef}>
          <meshBasicMaterial color="#8b5cf6" wireframe />
        </Icosahedron>
      </group>
    </Float>
  );
}

export default function Service3DVisual({ type }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4c1d95" />
          
          <Environment preset="city" />

          <PresentationControls 
            global 
            config={{ mass: 2, tension: 500 }} 
            snap={{ mass: 4, tension: 1500 }} 
            rotation={[0, 0, 0]} 
            polar={[-Math.PI / 3, Math.PI / 3]} 
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            {type === 'google-review' && <GoogleReviewModel />}
            {type === 'nfc-tap' && <NFCTapModel />}
            {type === 'presence-grow' && <PresenceGrowModel />}
            {type === 'design-web' && <DesignWebModel />}
          </PresentationControls>

          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
