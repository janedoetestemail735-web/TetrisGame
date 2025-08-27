import { useMemo } from "react";
import { useTetris } from "@/lib/stores/useTetris";

export default function GhostPiece() {
  const { currentPiece, getGhostPosition } = useTetris();

  const ghostPosition = useMemo(() => {
    if (!currentPiece) return null;
    return getGhostPosition();
  }, [currentPiece, getGhostPosition]);

  if (!currentPiece || !ghostPosition) return null;

  return (
    <group position={[ghostPosition.x, ghostPosition.y, ghostPosition.z]}>
      {currentPiece.shape.map((block, index) => (
        <mesh key={index} position={[block.x, block.y, block.z]}>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshBasicMaterial 
            color={currentPiece.color}
            transparent={true}
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
