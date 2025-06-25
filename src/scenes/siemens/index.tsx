import { useRef } from "react";

import * as THREE from "three";
import { Model } from "@/components/Model";
import { Grid, useGLTF } from "@react-three/drei";

import stage_1 from "@/assets/models/stage-100-simple.glb";
import stage_2 from "@/assets/models/stage-200-simple.glb";
import stage_3 from "@/assets/models/stage-300-simple.glb";
import stage_4 from "@/assets/models/stage-400-simple.glb";
// import { useCameraController } from "@/hooks/useCameraController";

interface IStage {
  scene: string;
  position: [number, number, number];
  animation_name: string;
}

const STAGES: IStage[] = [
  {
    scene: stage_1,
    position: [-6, 0, -6],
    animation_name: "stage-100-default",
  },
  { scene: stage_2, position: [6, 0, 6], animation_name: "stage-200-default" },
  { scene: stage_3, position: [6, 0, -6], animation_name: "stage-300-default" },
  { scene: stage_4, position: [-6, 0, 6], animation_name: "stage-400-default" },
];

// const zoomLimit = { min: 0.8, max: 1.2 };
// const verticalLimit = Math.PI / 15;

export const SiemensScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  // useCameraController(groupRef, zoomLimit, verticalLimit);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Grid
        position={[0, 0, 0]}
        args={[10.5, 10.5]}
        cellSize={0.5}
        cellColor={"#4E465B"}
        sectionColor={"#5E576A"}
        cellThickness={1}
        sectionSize={6}
        sectionThickness={1}
        fadeDistance={155}
        fadeStrength={1.2}
        infiniteGrid
      />

      {STAGES.map(({ scene, position, animation_name }, i) => (
        <Model
          scene={scene}
          position={position}
          animation_name={animation_name}
          key={`scene-${i}`}
        />
      ))}
    </group>
  );
};

STAGES.forEach(({ scene }) => {
  useGLTF.preload(scene);
});
