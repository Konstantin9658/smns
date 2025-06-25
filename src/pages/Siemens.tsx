import { Camera } from "@/components/Camera";
import { Effects } from "@/components/Effects";
import { Env } from "@/components/Env";
import { SiemensScene } from "@/scenes/siemens";
import { Preload, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export const Siemens = () => {
  const { active } = useProgress();

  return (
    <Canvas
      frameloop={active ? "demand" : "always"}
      style={{
        height: "100vh",
      }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      performance={{ min: 0.5, max: 2 }}
      shadows
    >
      <Preload all />
      <Effects />
      {/* <StatsGl showPanel={1} className="panel" /> */}
      <Camera />
      <Env />
      <Suspense>
        <SiemensScene />
      </Suspense>
      <color attach="background" args={["#362D45"]} />
    </Canvas>
  );
};
