import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { KeyboardControls } from "@react-three/drei";
import "@fontsource/inter";
import GameField from "./components/tetris/GameField";
import PlacedPieces from "./components/tetris/PlacedPieces";
import Tetromino from "./components/tetris/Tetromino";
import GhostPiece from "./components/tetris/GhostPiece";
import GameHUD from "./components/tetris/GameHUD";
import CameraController from "./components/tetris/CameraController";
import { useTetris } from "./lib/stores/useTetris";
import { useAudio } from "./lib/stores/useAudio";
import { controlsMap } from "./lib/tetris/controls";

function App() {
  const { initializeGame, gameState } = useTetris();
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    // Initialize the game
    initializeGame();

    // Load audio files
    const bgMusic = new Audio("/sounds/background.mp3");
    const hitAudio = new Audio("/sounds/hit.mp3");
    const successAudio = new Audio("/sounds/success.mp3");
    
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    
    setBackgroundMusic(bgMusic);
    setHitSound(hitAudio);
    setSuccessSound(successAudio);
  }, [initializeGame, setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <KeyboardControls map={controlsMap}>
        <Canvas
          shadows
          camera={{
            position: [15, 15, 15],
            fov: 50,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance"
          }}
        >
          <color attach="background" args={["#0a0a0a"]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 10, 0]} intensity={0.5} />

          <Suspense fallback={null}>
            <GameField />
            <PlacedPieces />
            {gameState === "playing" && (
              <>
                <Tetromino />
                <GhostPiece />
              </>
            )}
            <CameraController />
          </Suspense>
        </Canvas>
        
        <GameHUD />
      </KeyboardControls>
    </div>
  );
}

export default App;
