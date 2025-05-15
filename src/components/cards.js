"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Player positions in 3D space
const PLAYER_POSITIONS = [
  { position: [-3.5, 0, -2], rotation: [0, 0.3, 0], name: "Player 1" }, // Player 1 (left)
  { position: [3.5, 0, -2], rotation: [0, -0.3, 0], name: "Player 2" }, // Player 2 (right)
  { position: [0, 0, -4], rotation: [0, 0, 0], name: "Player 3" }, // Player 3 (far)
  { position: [0, 0, 2], rotation: [0, Math.PI, 0], name: "YOU" }, // Player 4 (near/player)
];

// Card suits and values
const CARD_TYPES = [
  { suit: "♥", value: "A", color: "#e74c3c" },
  { suit: "♠", value: "K", color: "#2c3e50" },
  { suit: "♦", value: "Q", color: "#e74c3c" },
  { suit: "♣", value: "J", color: "#2c3e50" },
];

function Card({ index, isShuffling, hasShuffled, cardType }) {
  const meshRef = useRef();
  const { viewport } = useThree();

  // Load textures
  const textures = useTexture({
    paper: "/assets/paper_texture.png",
    normal: "/assets/paper_normal.png",
    roughness: "/assets/paper_roughness.png",
  });

  // Apply textures to all materials
  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
  });

  // Animation parameters
  const [targetPosition, setTargetPosition] = useState([0, 0.05 * index, 0]);
  const [targetRotation, setTargetRotation] = useState([0, 0, 0]);
  const [shuffleParams, setShuffleParams] = useState({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    rotationSpeed: [0, 0, 0],
  });

  // Initialize or update shuffle parameters when shuffling starts
  useEffect(() => {
    if (isShuffling) {
      // Random position within viewport bounds
      const randomPosition = [
        (Math.random() - 0.5) * 8,
        Math.random() * 5 + 2,
        (Math.random() - 0.5) * 8,
      ];

      // Random rotation
      const randomRotation = [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ];

      // Random rotation speed
      const randomRotationSpeed = [
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
      ];

      setShuffleParams({
        position: randomPosition,
        rotation: randomRotation,
        rotationSpeed: randomRotationSpeed,
      });
    }
  }, [isShuffling, viewport]);

  // Update target position and rotation based on game state
  useEffect(() => {
    if (hasShuffled && !isShuffling) {
      setTargetPosition(PLAYER_POSITIONS[index].position);
      setTargetRotation(PLAYER_POSITIONS[index].rotation);
    } else if (!isShuffling) {
      setTargetPosition([0, 0.05 * index, 0]);
      setTargetRotation([0, 0, 0]);
    }
  }, [hasShuffled, isShuffling, index]);

  // Animation loop
  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (isShuffling) {
      // During shuffle: move to random positions and rotate
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        shuffleParams.position[0],
        delta * 2
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        shuffleParams.position[1],
        delta * 2
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        shuffleParams.position[2],
        delta * 2
      );

      // Apply rotation speeds
      meshRef.current.rotation.x += delta * shuffleParams.rotationSpeed[0];
      meshRef.current.rotation.y += delta * shuffleParams.rotationSpeed[1];
      meshRef.current.rotation.z += delta * shuffleParams.rotationSpeed[2];
    } else {
      // Smooth transition to target position and rotation
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetPosition[0],
        delta * 4
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetPosition[1],
        delta * 4
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        targetPosition[2],
        delta * 4
      );

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation[0],
        delta * 4
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation[1],
        delta * 4
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        targetRotation[2],
        delta * 4
      );

      // Add subtle hovering animation for player's card
      if (index === 3 && hasShuffled) {
        meshRef.current.position.y += Math.sin(Date.now() * 0.002) * 0.02;
        meshRef.current.rotation.z += Math.sin(Date.now() * 0.001) * 0.002;
      }
    }
  });

  // Determine if this is the player's card
  const isPlayerCard = index === 3 && hasShuffled;

  return (
    <group>
      {/* Card mesh with paper-like properties */}
      <mesh
        ref={meshRef}
        position={[0, 0.05 * index, 0]}
        castShadow
        receiveShadow
      >
        {/* Slightly curved geometry for paper-like effect */}
        <boxGeometry args={[1.4, 0.02, 2]} />

        {/* Paper-like material */}
        <meshStandardMaterial
          map={textures.paper}
          normalMap={textures.normal}
          roughnessMap={textures.roughness}
          color={isPlayerCard ? "#f5f5f5" : "#e0e0e0"}
          roughness={0.7}
          metalness={0.1}
          side={THREE.DoubleSide}
        />

        {/* Card content - only visible when cards are dealt */}
        {hasShuffled && (
          <>
            {/* Card value and suit */}
            <Text
              position={[0, 0.02, 0]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.5}
              color={cardType.color}
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter_Bold.json"
            >
              {`${cardType.value}${cardType.suit}`}
            </Text>

            {/* Corner decorations */}
            <Text
              position={[-0.55, 0.02, -0.85]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.2}
              color={cardType.color}
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter_Bold.json"
            >
              {`${cardType.value}`}
            </Text>
            <Text
              position={[-0.55, 0.02, -0.7]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.2}
              color={cardType.color}
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter_Bold.json"
            >
              {`${cardType.suit}`}
            </Text>
          </>
        )}
      </mesh>

      {/* Player label */}
      {hasShuffled && (
        <Text
          position={[
            targetPosition[0],
            0.5,
            targetPosition[2] + (index === 3 ? 1 : 0),
          ]}
          rotation={[0, targetRotation[1], 0]}
          fontSize={0.4}
          color={index === 3 ? "#f5d76e" : "#f5f5f5"}
          anchorX="center"
          anchorY="bottom"
          font="/fonts/Inter_Bold.json"
        >
          {PLAYER_POSITIONS[index].name}
        </Text>
      )}
    </group>
  );
}

export default function Cards({ isShuffling, hasShuffled }) {
  return (
    <group>
      {CARD_TYPES.map((cardType, i) => (
        <Card
          key={i}
          index={i}
          isShuffling={isShuffling}
          hasShuffled={hasShuffled}
          cardType={cardType}
        />
      ))}
    </group>
  );
}
