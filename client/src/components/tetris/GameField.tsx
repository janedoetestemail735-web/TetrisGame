import { useMemo } from "react";
import * as THREE from "three";

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;
const FIELD_DEPTH = 10;

export default function GameField() {
  // Create materials for the transparent walls
  const wallMaterial = useMemo(() => 
    new THREE.MeshLambertMaterial({
      color: 0x4444ff,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    }), []
  );

  const edgeMaterial = useMemo(() =>
    new THREE.MeshBasicMaterial({
      color: 0x6666ff,
      transparent: true,
      opacity: 0.3
    }), []
  );

  return (
    <group>
      {/* Solid floor/bottom */}
      <mesh position={[FIELD_WIDTH/2 - 0.5, -0.5, FIELD_DEPTH/2 - 0.5]} receiveShadow>
        <boxGeometry args={[FIELD_WIDTH, 0.1, FIELD_DEPTH]} />
        <meshStandardMaterial color={0xcccccc} />
      </mesh>
      
      {/* Transparent wall wireframes */}
      <lineSegments position={[FIELD_WIDTH/2 - 0.5, FIELD_HEIGHT/2 - 0.5, FIELD_DEPTH/2 - 0.5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(FIELD_WIDTH, FIELD_HEIGHT, FIELD_DEPTH)]} />
        <lineBasicMaterial color={0x888888} opacity={0.2} transparent />
      </lineSegments>
    </group>
  );
}
