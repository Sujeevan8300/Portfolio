import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const tunnelLength = 80;

const NetworkGeometry = () => {
  const particleCount = 350;
  const maxDistance = 4.5;
  
  const { positions, colors, linePositions, lineColors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const points: THREE.Vector3[] = [];
    
    // 1. Generate nodes
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.5 + Math.random() * 8; // Hollow center for camera to fly through
      const z = (Math.random() - 0.5) * tunnelLength; // Spread from -40 to +40
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      points.push(new THREE.Vector3(x, y, z));
      
      // Node colors (Cyan dominant, occasional Purple)
      const isPurple = Math.random() > 0.85;
      col[i * 3] = isPurple ? 0.55 : 0.02; // R
      col[i * 3 + 1] = isPurple ? 0.20 : 0.70; // G
      col[i * 3 + 2] = isPurple ? 0.95 : 0.85; // B
    }
    
    // 2. Generate connections (Data links)
    const lPos: number[] = [];
    const lCol: number[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < maxDistance) {
          lPos.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          );
          
          // Fade line out based on distance
          const alpha = Math.max(0, 1 - (dist / maxDistance));
          // Connection color (darker cyan/blue)
          const r = 0.02 * alpha;
          const g = 0.40 * alpha;
          const b = 0.60 * alpha;
          
          lCol.push(r, g, b, r, g, b);
        }
      }
    }
    
    return {
      positions: pos,
      colors: col,
      linePositions: new Float32Array(lPos),
      lineColors: new Float32Array(lCol)
    };
  }, []);

  return (
    <group>
      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>
      
      {/* Connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={lineColors.length / 3} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
};

const ParticleNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Constant slow forward time-based movement
    const timeOffset = state.clock.elapsedTime * 1.5;
    
    // Scroll-based movement
    // window.scrollY is read directly for performance. 
    // Multiply by a small factor to map pixel scroll to 3D units.
    const scrollOffset = window.scrollY * 0.015; 
    
    const targetZ = scrollOffset + timeOffset;
    
    // Smoothly lerp towards targetZ
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ % tunnelLength, // Modulo creates infinite looping tunnel
      0.08
    );
    
    // Slowly rotate the entire tunnel
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.03;
  });
  
  return (
    <group ref={groupRef}>
      {/* 
        We stack 3 identical segments back-to-back.
        Because of the modulo in useFrame, it loops infinitely perfectly.
        The camera is at z=0, looking towards -z.
      */}
      <group position={[0, 0, 0]}><NetworkGeometry /></group>
      <group position={[0, 0, -tunnelLength]}><NetworkGeometry /></group>
      <group position={[0, 0, -tunnelLength * 2]}><NetworkGeometry /></group>
    </group>
  );
};

export const DataHighway = () => {
  return (
    // Fixed full-screen container placed behind everything
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base deep background color */}
      <div className="absolute inset-0 bg-[#030612]" />
      
      <Canvas
        camera={{ position: [0, 0, 2], fov: 60 }} // Camera slightly offset to see points passing by
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Fog to seamlessly fade out points in the distance and near camera */}
        <fog attach="fog" args={['#030612', 5, tunnelLength * 1.2]} />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
};
