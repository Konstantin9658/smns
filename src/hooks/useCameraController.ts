import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

// type CameraLimits = {
//   zoomLimit: { min: number; max: number };
//   verticalLimit: number;
//   positionLimit: {
//     x: { min: number; max: number };
//     z: { min: number; max: number };
//   };
// };

export const useCameraController = (
  ref: RefObject<THREE.Group<THREE.Object3DEventMap> | null>,
  zoomLimit: { min: number; max: number },
  positionLimit: {
    x: { min: number; max: number };
    z: { min: number; max: number };
  }
) => {
  const isDragging = useRef(false);
  const zoom = useRef(0.7); // DEFAULT ZOOM
  const lastMousePosition = useRef<{ x: number; y: number } | null>(null);
  const isRotating = useRef(false);
  const rotationY = useRef(THREE.MathUtils.degToRad(-50));
  const rotationX = useRef(0);
  const targetPosition = useRef<{ x: number; z: number }>({
    x: 0,
    z: 0,
  });

  useEffect(() => {
    if (!ref.current) return;

    ref.current.rotation.y = degToRad(-50);
  }, [ref]);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (event.button === 0) {
      isDragging.current = true;
    } else if (event.button === 2) {
      isRotating.current = true;
    }
    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    isRotating.current = false;
    lastMousePosition.current = null;
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!lastMousePosition.current) return;

    const deltaX = event.clientX - lastMousePosition.current.x;
    const deltaY = event.clientY - lastMousePosition.current.y;

    if (isDragging.current) {
      targetPosition.current.z += deltaY * 0.05;
      targetPosition.current.x += deltaX * 0.05;
    } else if (isRotating.current) {
      rotationY.current += deltaX * 0.005; // вращение влево-вправо
      rotationX.current += deltaY * 0.005; // вращение вверх-вниз

      // Ограничим вращение по X, чтобы не перевернуть сцену
      rotationX.current = THREE.MathUtils.clamp(
        rotationX.current,
        -Math.PI / 20,
        Math.PI / 20
      );
    }

    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      zoom.current = THREE.MathUtils.clamp(
        zoom.current - event.deltaY * 0.001,
        zoomLimit.min,
        zoomLimit.max
      );
    },
    [zoomLimit.max, zoomLimit.min]
  );

  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => e.preventDefault();

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("contextmenu", preventContextMenu);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("contextmenu", preventContextMenu);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleWheel]);

  // useFrame((_, delta) => {
  //   if (!ref.current) return;

  //   const zoomFactor =
  //     (zoom.current - zoomLimit.min) / (zoomLimit.max - zoomLimit.min);

  //   const allowedXMin = positionLimit.x.min * (0.5 + zoom.current * zoomFactor);
  //   const allowedXMax = positionLimit.x.max * (0.5 + zoom.current * zoomFactor);

  //   const allowedZMin = positionLimit.z.min * (0.5 + zoom.current * zoomFactor);
  //   const allowedZMax = positionLimit.z.max * (0.5 + zoom.current * zoomFactor);

  //   targetPosition.current.x = THREE.MathUtils.clamp(
  //     targetPosition.current.x,
  //     allowedXMin,
  //     allowedXMax
  //   );

  //   targetPosition.current.z = THREE.MathUtils.clamp(
  //     targetPosition.current.z,
  //     allowedZMin,
  //     allowedZMax
  //   );

  //   ref.current.position.x = THREE.MathUtils.damp(
  //     ref.current.position.x,
  //     targetPosition.current.x,
  //     3,
  //     delta
  //   );

  //   ref.current.position.z = THREE.MathUtils.damp(
  //     ref.current.position.z,
  //     targetPosition.current.z,
  //     3,
  //     delta
  //   );

  //   const newScale = THREE.MathUtils.damp(
  //     ref.current.scale.x,
  //     zoom.current,
  //     3,
  //     delta
  //   );
  //   ref.current.scale.setScalar(newScale);
  // });

  useFrame((_, delta) => {
    if (!ref.current) return;

    const zoomFactor =
      (zoom.current - zoomLimit.min) / (zoomLimit.max - zoomLimit.min);

    const allowedXMin = positionLimit.x.min * (0.25 + zoom.current * zoomFactor);
    const allowedXMax = positionLimit.x.max * (0.25 + zoom.current * zoomFactor);

    const allowedZMin = positionLimit.z.min * (0.25 + zoom.current * zoomFactor);
    const allowedZMax = positionLimit.z.max * (0.25 + zoom.current * zoomFactor);

    targetPosition.current.x = THREE.MathUtils.clamp(
      targetPosition.current.x,
      allowedXMin,
      allowedXMax
    );

    targetPosition.current.z = THREE.MathUtils.clamp(
      targetPosition.current.z,
      allowedZMin,
      allowedZMax
    );

    ref.current.position.x = THREE.MathUtils.damp(
      ref.current.position.x,
      targetPosition.current.x,
      3,
      delta
    );

    ref.current.position.z = THREE.MathUtils.damp(
      ref.current.position.z,
      targetPosition.current.z,
      3,
      delta
    );

    ref.current.rotation.y = THREE.MathUtils.damp(
      ref.current.rotation.y,
      rotationY.current,
      3,
      delta
    );

    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      rotationX.current,
      3,
      delta
    );

    const newScale = THREE.MathUtils.damp(
      ref.current.scale.x,
      zoom.current,
      3,
      delta
    );
    ref.current.scale.setScalar(newScale);
  });
};
