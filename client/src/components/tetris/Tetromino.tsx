import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTetris } from "@/lib/stores/useTetris";
import { useAudio } from "@/lib/stores/useAudio";

export default function Tetromino() {
  const groupRef = useRef<THREE.Group>(null);
  const { currentPiece, movePiece, rotatePiece, dropPiece, hardDrop, holdPiece, pauseGame, resumeGame, gameState, gameLoop } = useTetris();
  const { playHit } = useAudio();
  const lastDropTime = useRef(Date.now());
  const dropInterval = useRef(1000); // 1 second initially

  useFrame(() => {
    const now = Date.now();
    if (now - lastDropTime.current > dropInterval.current) {
      const moved = movePiece(0, -1, 0);
      if (!moved) {
        playHit();
      }
      lastDropTime.current = now;
    }
    gameLoop();
  });

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
          movePiece(0, 0, -1);
          break;
        case 'ArrowDown':
          movePiece(0, 0, 1);
          break;
        case 'KeyW':
          movePiece(0, 1, 0);
          break;
        case 'KeyS':
          dropPiece();
          break;
        // Rotation controls
        case 'KeyQ':
          rotatePiece('x');
          break;
        case 'KeyE':
          rotatePiece('y');
          break;
        case 'KeyR':
          rotatePiece('z');
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
