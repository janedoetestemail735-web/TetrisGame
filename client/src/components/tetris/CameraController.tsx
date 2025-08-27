import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function CameraController() {
  const { camera } = useThree();
  const controlsRef = useRef<any>();

  // Set optimal viewing angle
  useEffect(() => {
    camera.position.set(18, 22, 18);
    camera.lookAt(4.5, 9.5, 4.5);
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={true}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={12}
      maxDistance={45}
      target={[4.5, 9.5, 4.5]}
      enableDamping={true}
      dampingFactor={0.05}
      rotateSpeed={0.8}
      zoomSpeed={1.2}
    />
  );
}
