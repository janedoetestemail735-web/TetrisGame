import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTetris } from "@/lib/stores/useTetris";
import { useAudio } from "@/lib/stores/useAudio";

export default function Tetromino() {
  const groupRef = useRef<THREE.Group>(null);
  const { currentPiece, movePiece, rotatePiece, dropPiece, hardDrop, holdPiece, pauseGame, resumeGame, gameState } = useTetris();
  const { playHit } = useAudio();


  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log("Key pressed:", event.code);
      
      switch (event.code) {
        // Movement controls
        case 'ArrowLeft':
          movePiece(-1, 0, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0, 0);
          break;
        case 'ArrowUp':
          movePiece(0, 1, 0);
          break;
        case 'ArrowDown':
          dropPiece();
          break;
        // Single rotation control
        case 'KeyX':
          rotatePiece();
          break;
        case 'Space':
          event.preventDefault();
          hardDrop();
          break;
        case 'KeyC':
          holdPiece();
          break;
        case 'KeyP':
          if (gameState === "playing") {
            pauseGame();
          } else if (gameState === "paused") {
            resumeGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, rotatePiece, dropPiece, hardDrop, holdPiece, pauseGame, resumeGame, gameState]);

  if (!currentPiece) return null;

  return (
    <group ref={groupRef} position={[currentPiece.x, currentPiece.y, currentPiece.z]}>
      {currentPiece.shape.map((block, index) => (
        <mesh
          key={index}
          position={[block.x, block.y, block.z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshStandardMaterial 
            color={currentPiece.color}
          />
        </mesh>
      ))}
    </group>
  );
}
