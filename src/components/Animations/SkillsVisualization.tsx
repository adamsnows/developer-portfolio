import {
  Box,
  OrbitControls,
  Sphere,
  Text,
  useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";
import ClientOnly from "./ClientOnly";

// Dynamically import Canvas to prevent SSR issues
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  {
    ssr: false,
  }
);

// Technology sphere component
interface TechSphereProps {
  position: [number, number, number];
  texture: string;
  name: string;
  size?: number;
  speed?: number;
}

const TechSphere = ({
  position,
  texture,
  name,
  size = 1,
  speed = 1,
}: TechSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const sphereTexture = useTexture(texture);

  // Rotate the sphere
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speed * 0.5;
    }
  });

  return (
    <group position={position}>
      <Sphere
        args={[size, 32, 32]}
        ref={meshRef}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <meshStandardMaterial
          map={sphereTexture}
          emissive={hovered ? "#fff" : "#000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Sphere>

      <Text
        position={[0, -size - 0.3, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

// Floating cube component
interface FloatingCubeProps {
  position: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
}

const FloatingCube = ({
  position,
  color = "#8352FD",
  size = 0.5,
  speed = 1,
}: FloatingCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Make the cube float up and down
      meshRef.current.position.y +=
        Math.sin(state.clock.elapsedTime * speed) * 0.005;
      meshRef.current.rotation.x += delta * 0.2 * speed;
      meshRef.current.rotation.y += delta * 0.3 * speed;
    }
  });

  return (
    <Box
      args={[size, size, size]}
      position={position}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={hovered ? "#FF5E5B" : color}
        wireframe={true}
        opacity={0.8}
        transparent
      />
    </Box>
  );
};

// Main scene component that positions all the elements
const Scene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#5E17EB" />

      {/* Technology spheres */}
      <TechSphere
        position={[0, 0, 0]}
        texture="/favicon.webp"
        name="JavaScript"
        size={1.2}
        speed={0.8}
      />

      <TechSphere
        position={[2.5, 1, -1]}
        texture="/favicon.webp"
        name="React"
        size={0.9}
        speed={1.2}
      />

      <TechSphere
        position={[-2.5, 0.8, -1]}
        texture="/favicon.webp"
        name="Node.js"
        size={0.9}
        speed={1}
      />

      <TechSphere
        position={[1, -1.5, -2]}
        texture="/favicon.webp"
        name="Next.js"
        size={0.8}
        speed={1.3}
      />

      <TechSphere
        position={[-1.5, -1.2, -1.5]}
        texture="/favicon.webp"
        name="TypeScript"
        size={0.7}
        speed={0.9}
      />

      {/* Decorative floating cubes */}
      <FloatingCube
        position={[3, 2, -3]}
        color="#5E17EB"
        size={0.3}
        speed={1.5}
      />
      <FloatingCube
        position={[-3, 2, -2]}
        color="#8352FD"
        size={0.4}
        speed={1.2}
      />
      <FloatingCube
        position={[2, -2, -2]}
        color="#FF5E5B"
        size={0.25}
        speed={1.8}
      />
      <FloatingCube
        position={[-2.5, -2, -3]}
        color="#5E17EB"
        size={0.35}
        speed={1.3}
      />
      <FloatingCube
        position={[0, 3, -4]}
        color="#8352FD"
        size={0.5}
        speed={1}
      />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
};

// Loading component
const Loader = () => {
  return (
    <Text
      position={[0, 0, 0]}
      fontSize={0.5}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
    >
      Loading...
    </Text>
  );
};

// Main 3D component to be used in the portfolio
const SkillsVisualization = ({ className = "" }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`${className} w-full h-[400px] md:h-[500px] relative rounded-xl overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {mounted && (
        <ClientOnly>
          <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
            <Suspense fallback={<Loader />}>
              <Scene />
            </Suspense>
          </Canvas>
        </ClientOnly>
      )}
    </motion.div>
  );
};

export default SkillsVisualization;
