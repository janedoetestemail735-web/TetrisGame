import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function CameraController() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    // Set initial camera position (front view of playfield)
    camera.position.set(4.5, 10, 25);
    camera.lookAt(4.5, 10, 4.5);
    camera.updateProjectionMatrix();

    // Configure OrbitControls if available
    if (controlsRef.current) {
      // Set the target to the center of the playfield
      controlsRef.current.target.set(4.5, 10, 4.5);
      
      // Enable damping for smooth camera movement
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.05;
      
      // Set zoom limits
      controlsRef.current.minDistance = 10;
      controlsRef.current.maxDistance = 50;
      
      // Limit vertical rotation to prevent flipping upside down
      controlsRef.current.maxPolarAngle = Math.PI * 0.9;
      controlsRef.current.minPolarAngle = Math.PI * 0.1;
      
      // Update controls
      controlsRef.current.update();
    }
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false} // Disable panning to keep focus on playfield
      enableZoom={true} // Enable mouse wheel zoom
      enableRotate={true} // Enable mouse drag rotation
      zoomSpeed={1.0}
      rotateSpeed={0.5}
    />
  );
}