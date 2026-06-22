'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';

// Uses robot.glb (the GVV-branded robot, also used on /academic) rather than
// final_robot.glb — the latter's rig is broken (eyes baked onto the chest in its
// bind pose). This scale/Y frames robot.glb centred in the showcase camera.
const ROBOT_SCALE = 0.4;
const ROBOT_Y = -1.2;

function Robot({ progressRef }) {
  const group = useRef(null);
  const { scene } = useGLTF('/models/robot.glb');
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = (progressRef.current || 0) * Math.PI * 2;
    }
  });
  return <primitive ref={group} object={scene} scale={ROBOT_SCALE} position={[0, ROBOT_Y, 0]} />;
}

useGLTF.preload('/models/robot.glb');

export default function RobotShowcase({ progressRef }) {
  return (
    <Canvas camera={{ position: [0, 0.5, 6], fov: 40 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#02040c']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={1.2} />
      <pointLight position={[-4, 2, 3]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[4, -2, -3]} intensity={0.8} color="#3b82f6" />
      <Suspense fallback={null}>
        <Robot progressRef={progressRef} />
      </Suspense>
    </Canvas>
  );
}
