"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

function AtomScene({ reducedMotion }) {
  const groupRef = useRef();
  const { scene } = useGLTF("/models/atom2.glb");
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
  const compactQuery = window.matchMedia("(max-width: 900px)");

  const update = () => {
    setIsCompact(compactQuery.matches);
  };

  update();
  compactQuery.addEventListener("change", update);

  return () => {
    compactQuery.removeEventListener("change", update);
  };
}, []);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.04;
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.1}
      rotationIntensity={reducedMotion ? 0 : 0.2}
      floatIntensity={reducedMotion ? 0 : 0.1}
    >
<group
  ref={groupRef}
  scale={isCompact ? 0.85 : 0.88} // ✅ prevents edge clipping
  position={[0, 0.35, 0]}
>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: "#00d4ff",
          textTransform: "uppercase",
        }}
      >
        Loading...
      </div>
    </Html>
  );
}

export default function AtomModel() {
  const [isCompact, setIsCompact] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 900px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setIsCompact(compactQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    update();

    compactQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
      compactQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      className="atom-model-shell"
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "clamp(300px, 56vw, 650px)",
        position: "relative",
        overflow: "hidden",
        border: "none",
        background:
          "transparent",
      }}
    >
      <Canvas
        dpr={isCompact ? [1, 1.2] : [1, 1.6]}
        camera={{
          position: [0, isCompact ? 0.2 : 0, isCompact ? 11.5 : 10.5], // ✅ slightly back
  fov: isCompact ? 46 : 40, // ✅ wider view
        }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={1.8} color="#8be9ff" />
        <pointLight position={[0, 0, 6]} intensity={7.5} color="#00d4ff" />

        <Suspense fallback={<LoadingFallback />}>
          <AtomScene reducedMotion={reducedMotion} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={!isCompact}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.8}
        />
      </Canvas>

      <style>{`
        @media (max-width: 900px) {
          .atom-model-shell {
            height: clamp(280px, 70vw, 500px) !important;
          }
        }
      `}</style>
    </div>
  );
}

// preload
useGLTF.preload("/models/atom2.glb");