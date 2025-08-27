import { Canvas } from "@react-three/fiber";
import { useTetris } from "@/lib/stores/useTetris";

export default function NextPiecePreview() {
  const { nextPieces } = useTetris();
  
  if (!nextPieces[0]) return null;

  const nextPiece = nextPieces[0];

  return (
    <div className="w-24 h-24 bg-gray-900 rounded border border-gray-600">
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        
        <group position={[0, 0, 0]}>
          {nextPiece.shape.map((block, index) => (
            <mesh
              key={index}
              position={[block.x * 0.6, block.y * 0.6, block.z * 0.6]}
            >
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color={nextPiece.color} />
            </mesh>
          ))}
        </group>
      </Canvas>
    </div>
  );
}