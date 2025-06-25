import { Environment } from "@react-three/drei";
import * as THREE from "three";

import env from "@/assets/env.hdr";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const Env = () => {
  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);

  const euler = useRef(new THREE.Euler());

  useFrame(() => {
    const { x, y, z } = euler.current.setFromQuaternion(
      camera.quaternion,
      "ZYX",
      true
    );
    scene.environmentRotation.x = x;
    scene.environmentRotation.y = y - 0.9;
    scene.environmentRotation.z = z + 1;
  });

  return <Environment files={env} environmentIntensity={0.8} />;
};
