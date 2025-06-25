import model from "@/assets/models/reassembling_maps.glb";
import { useCameraController } from "@/hooks/useCameraController";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const zoomLimit = { min: 0.5, max: 1.2 };

export const SiemensMapScene = () => {
  const { scene } = useGLTF(model);
  const ref = useRef<THREE.Group | null>(null);

  useCameraController(ref, zoomLimit, {
    x: { min: -30, max: 30 },
    z: { min: -30, max: 30 },
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload(model);
