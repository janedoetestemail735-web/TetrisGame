import { useTetris, PlacedBlock } from "@/lib/stores/useTetris";

export default function PlacedPieces() {
  const { placedPieces } = useTetris();

  if (!placedPieces || placedPieces.length === 0) return null;

  return (
    <group>
      {placedPieces.map((piece: PlacedBlock, index: number) => (
        <mesh
          key={index}
          position={[piece.x, piece.y, piece.z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshStandardMaterial 
            color={piece.color}
          />
        </mesh>
      ))}
    </group>
  );
}