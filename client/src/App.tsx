import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import "@fontsource/inter";
import GameField from "./components/tetris/GameField";
import PlacedPieces from "./components/tetris/PlacedPieces";
import Tetromino from "./components/tetris/Tetromino";
import GhostPiece from "./components/tetris/GhostPiece";
import GameHUD from "./components/tetris/GameHUD";
import CameraController from "./components/tetris/CameraController";
import { useTetris } from "./lib/stores/useTetris";
import { useAudio } from "./lib/stores/useAudio";

function App() {
  const { initializeGame, gameState, gameLoop } = useTetris();
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Game loop effect
  useEffect(() => {
    const interval = setInterval(() => {
      gameLoop();
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, [gameLoop]);

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
      <Canvas
        shadows
        camera={{
          position: [4.5, 10, 25],
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
    </div>
  );
}

export default App;
