import { Camera } from "@/components/Camera";
import { Effects } from "@/components/Effects";
import { Env } from "@/components/Env";
import { SiemensMapScene } from "@/scenes/siemens-map";
import { Loader, Preload, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export const SiemensMap = () => {
  const { active } = useProgress();

  return (
    <>
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

        <Suspense>
          <Effects />
          <Camera />
          <Env />
          <SiemensMapScene />
        </Suspense>
        <color attach="background" args={["#362D45"]} />
      </Canvas>
      <Loader />
    </>
  );
};
