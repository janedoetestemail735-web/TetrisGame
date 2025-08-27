import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraController() {
  const { camera } = useThree();

  
  // Set fixed camera position for straight-on view
  useEffect(() => {
    // Position camera straight in front of the playfield
    camera.position.set(4.5, 10, 25);
    camera.lookAt(4.5, 10, 4.5);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}
