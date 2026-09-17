"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NeuralCore() {
  const group = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const { size } = useThree();
  const points = useMemo(() => {
    const positions: number[] = [];
    const count = size.width < 768 ? 64 : 130;
    for (let index = 0; index < count; index += 1) {
      const phi = Math.acos(1 - (2 * (index + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * index;
      const radius = 1.65 + Math.sin(index * 2.7) * 0.16;
      positions.push(
        Math.cos(theta) * Math.sin(phi) * radius,
        Math.cos(phi) * radius,
        Math.sin(theta) * Math.sin(phi) * radius,
      );
    }
    return new Float32Array(positions);
  }, [size.width]);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (reducedMotion) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += delta * 0.025;
    group.current.rotation.y += (state.pointer.x * 0.28 - group.current.rotation.y) * 0.018;
    group.current.rotation.x += (-state.pointer.y * 0.18 - group.current.rotation.x) * 0.018;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[0.45, 0.2, 0.65]}>
        <icosahedronGeometry args={[1.48, 1]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.22} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#d8f5ff" size={0.032} transparent opacity={0.85} />
      </points>
    </group>
  );
}

export default function NexusCore() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-label="Interactive neural network core"
    >
      <NeuralCore />
    </Canvas>
  );
}