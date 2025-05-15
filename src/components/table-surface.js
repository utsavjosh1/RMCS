"use client";

import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function TableSurface() {
  // Load textures for the felt table
  const textures = useTexture({
    map: "/assets/felt_texture.png",
    normalMap: "/assets/felt_normal.png",
    roughnessMap: "/assets/felt_roughness.png",
  });

  // Apply texture settings
  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
  });

  return (
    <group>
      {/* Main table surface */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a5c36"
          map={textures.map}
          normalMap={textures.normalMap}
          roughnessMap={textures.roughnessMap}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Table edge */}
      <mesh position={[0, -0.55, 0]} receiveShadow>
        <ringGeometry args={[9.7, 10, 32]} />
        <meshStandardMaterial color="#5d4037" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  );
}
