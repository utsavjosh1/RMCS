"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  AccumulativeShadows,
  RandomizedLight,
  Preload,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import Cards from "@/components/cards";
import TableSurface from "@/components/table-surface";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

export default function CardGame() {
  const [isShuffling, setIsShuffling] = useState(false);
  const [hasShuffled, setHasShuffled] = useState(false);

  const handleStart = () => {
    if (!isShuffling) {
      setIsShuffling(true);
      setTimeout(() => {
        setIsShuffling(false);
        setHasShuffled(true);
      }, 3000); // Animation duration
    }
  };

  return (
    <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 10, 20]} />

        <PerspectiveCamera makeDefault position={[0, 6, 8]} fov={45} />

        <ambientLight intensity={0.2} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />

        <Suspense fallback={null}>
          <TableSurface />
          <Cards isShuffling={isShuffling} hasShuffled={hasShuffled} />
          <Environment preset="apartment" />
          <AccumulativeShadows
            temporal
            frames={30}
            alphaTest={0.85}
            opacity={0.8}
            scale={14}
            position={[0, -0.49, 0]}
          >
            <RandomizedLight
              amount={4}
              radius={9}
              intensity={0.55}
              ambient={0.25}
              position={[5, 5, -10]}
            />
          </AccumulativeShadows>

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              height={300}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
          </EffectComposer>

          <Preload all />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <Button
          onClick={handleStart}
          disabled={isShuffling}
          className="px-8 py-2 text-lg bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
        >
          {isShuffling
            ? "Shuffling..."
            : hasShuffled
            ? "Shuffle Again"
            : "Start Game"}
        </Button>
      </div>

      <div className="absolute top-4 left-0 right-0 text-center text-white text-xl font-semibold">
        3D Card Game
      </div>
    </div>
  );
}
