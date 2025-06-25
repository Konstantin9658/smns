import {
  FAR_PERSPECTIVE_CAMERA,
  NEAR_PERSPECTIVE_CAMERA,
  REFERENCE_FOV,
  REFERENCE_HEIGHT,
  REFERENCE_WIDTH,
} from "@/consts";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

export const Camera = () => {
  const size = useThree((state) => state.size);

  const fov = useMemo(() => {
    const widthFactor = REFERENCE_WIDTH / size.width;
    const heightFactor = size.height / REFERENCE_HEIGHT;

    return THREE.MathUtils.clamp(
      REFERENCE_FOV * widthFactor * heightFactor,
      1,
      120
    );
  }, [size]);

  return (
    <PerspectiveCamera
      makeDefault
      fov={fov}
      // position={[0, 125, 125]}
      position={[0, 105, 125]}
      rotation-x={degToRad(-40)}
      name="Camera"
      near={NEAR_PERSPECTIVE_CAMERA}
      far={FAR_PERSPECTIVE_CAMERA}
    />
  );
};
