'use client'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Props = {
  url: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  animationName?: string
  fadeDuration?: number
  /**
   * Material names whose white emissive should be removed. The robot's `eyes`
   * material ships with `emissiveFactor = [1,1,1]`, which blows the eyes out to
   * solid white ovals and hides the actual colored/pupilled eye texture baked
   * into its baseColorTexture. Zeroing the emissive lets that texture show, so
   * the robot has real eyes again (same Blender-baked-emissive blowout that the
   * school model had).
   */
  dimEmissiveMaterials?: string[]
}

export default function Character({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animationName,
  fadeDuration = 0.5,
  dimEmissiveMaterials,
}: Props) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(url, '/draco/')
  const { actions, names } = useAnimations(animations, group)
  const currentAction = useRef<string | null>(null)

  useEffect(() => {
    console.log(`[${url}] animations available:`, names)
  }, [url, names])

  useEffect(() => {
    if (!dimEmissiveMaterials?.length) return
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (!mesh.isMesh) return
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      mats.forEach((mat) => {
        const std = mat as THREE.MeshStandardMaterial
        if (std?.name && dimEmissiveMaterials.includes(std.name)) {
          std.emissive = new THREE.Color(0, 0, 0)
          std.emissiveIntensity = 0
          std.emissiveMap = null
          std.needsUpdate = true
        }
      })
    })
  }, [scene, dimEmissiveMaterials])

  useEffect(() => {
    if (!animationName || !actions[animationName]) return

    const nextAction = actions[animationName]
    const prevName = currentAction.current
    const prevAction = prevName ? actions[prevName] : null

    if (prevAction && prevName !== animationName) {
      prevAction.fadeOut(fadeDuration)
    }

    nextAction!
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(fadeDuration)
      .play()

    currentAction.current = animationName

    return () => {
      nextAction?.fadeOut(fadeDuration)
    }
  }, [animationName, actions, fadeDuration])

  return (
    <primitive
      ref={group}
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
      dispose={null}
    />
  )
}