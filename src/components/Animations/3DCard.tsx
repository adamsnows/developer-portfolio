import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
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

interface ShapeProps {
  position?: [number, number, number];
  color?: string;
  factor?: number;
  speed?: number;
  scale?: [number, number, number];
}

// This is a React Three Fiber component that renders an interactive 3D shape
export const Shape = ({
  position = [0, 0, 0],
  color = "#8352FD",
  factor = 4,
  speed = 1,
  scale = [1, 1, 1],
}: ShapeProps) => {
  const mesh = useRef<any>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // This hook runs on every frame
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01 * speed;
    }
  });

  return (
    <Sphere
      ref={mesh}
      position={position}
      args={[1, 64, 64]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={active ? 1.2 : 1}
    >
      <MeshDistortMaterial
        color={new THREE.Color(hovered ? "#FF5E5B" : color)}
        speed={3}
        distort={hovered ? 0.6 : 0.3}
        factor={factor}
      />
    </Sphere>
  );
};

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  backgroundColors?: string[];
}

// Container component that provides a 3D scene
const Card3D = ({
  children,
  className = "",
  backgroundColors = ["#8352FD", "#3913B8"],
}: Card3DProps) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`relative ${className} overflow-hidden rounded-xl`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        opacity: inView ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${backgroundColors[0]}, ${backgroundColors[1]})`,
          filter: "blur(20px)",
          opacity: 0.2,
        }}
      />

      <div className="relative z-10">
        <ClientOnly>{children}</ClientOnly>
      </div>
    </div>
  );
};

export default Card3D;
