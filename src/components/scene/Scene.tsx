'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Character from './Character'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [3, 3, 3], fov: 45 }}
      style={{ height: '100vh', width: '100vw' }}
    >
      <color attach="background" args={['#1a1a2e']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

     <Suspense fallback={null}>
      <Character url="/models/robot.glb" position={[ 0, 0, -30]} scale={8} rotation={[0, Math.PI/2, 0]} />
      <Character url="/models/boy.glb"   position={[ 0, 0,  10]} scale={0.3} rotation={[0, -Math.PI/2, 0]} />
     </Suspense>

      <OrbitControls target={[0, 1, 0]} />
      
    </Canvas>
  )
}