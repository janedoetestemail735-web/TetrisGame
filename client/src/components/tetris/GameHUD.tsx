import { useTetris } from "@/lib/stores/useTetris";
import { useAudio } from "@/lib/stores/useAudio";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NextPiecePreview from "./NextPiecePreview";

export default function GameHUD() {
  const { 
    score, 
    level, 
    linesCleared, 
    gameState, 
    heldPiece, 
    nextPieces,
    pauseGame,
    resumeGame,
    restartGame 
  } = useTetris();
  
  const { isMuted, toggleMute } = useAudio();

  const handlePause = () => {
    console.log("Pause button clicked, current state:", gameState);
    if (gameState === "playing") {
      pauseGame();
    } else if (gameState === "paused") {
      resumeGame();
    }
  };

  return (
    <>
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="bg-black/70 text-white px-4 py-3 rounded">
          <div className="text-lg font-bold">Score: {score}</div>
          <div className="text-sm">Level: {level} | Lines: {linesCleared}</div>
        </div>

        <button 
          onClick={handlePause}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition-colors"
        >
          {gameState === "paused" ? "▶ Resume" : "⏸ Pause"}
        </button>

        <div className="bg-black/70 text-white px-4 py-3 rounded">
          <div className="text-sm font-bold mb-2">Next Piece:</div>
          <NextPiecePreview />
        </div>
      </div>

      {/* 3D Controls Guide */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-black/80 text-white p-4 rounded max-w-sm">
          <div className="font-bold mb-2 text-center">3D Controls</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-yellow-400 font-semibold">Movement:</div>
              <div>← → Left/Right</div>
              <div>↑ Up | ↓ Soft Drop</div>
            </div>
            <div>
              <div className="text-green-400 font-semibold">Rotation:</div>
              <div>X: Rotate (cycles axes)</div>
            </div>
          </div>
          <div className="mt-2 text-center text-xs text-gray-300">
            Space: Hard Drop | C: Hold
          </div>
        </div>
      </div>

      {/* Game Over Screen */}
      {gameState === "gameOver" && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-20">
          <Card className="bg-black text-white border-gray-600">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Game Over</h2>
              <p className="text-xl mb-2">Final Score: {score}</p>
              <p className="text-lg mb-6">Lines Cleared: {linesCleared}</p>
              <Button 
                onClick={restartGame}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Play Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Paused Screen */}
      {gameState === "paused" && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-15">
          <Card className="bg-black/90 text-white border-gray-600">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
              <p className="mb-4">Press P to resume</p>
              <Button 
                onClick={resumeGame}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
