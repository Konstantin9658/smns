import { useRef } from "react";

import * as THREE from "three";
import { Grid } from "@react-three/drei";
// import { useCameraController } from "@/hooks/useCameraController";

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
    </group>
  );
};
