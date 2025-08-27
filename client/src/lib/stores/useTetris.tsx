import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { TetrominoType, TETROMINO_SHAPES, TETROMINO_COLORS } from "../tetris/pieces";
import { 
  checkCollision, 
  clearCompleteLines, 
  rotatePieceShape,
  getRandomPiece 
} from "../tetris/gameLogic";

export interface Block {
  x: number;
  y: number;
  z: number;
}

export interface Piece {
  type: TetrominoType;
  shape: Block[];
  color: string;
  x: number;
  y: number;
  z: number;
}

export interface PlacedBlock {
  x: number;
  y: number;
  z: number;
  color: string;
}

export type GameState = "ready" | "playing" | "paused" | "gameOver";

interface TetrisState {
  gameState: GameState;
  score: number;
  level: number;
  linesCleared: number;
  field: boolean[][][]; // [x][y][z]
  placedPieces: PlacedBlock[];
  currentPiece: Piece | null;
  nextPieces: Piece[];
  heldPiece: Piece | null;
  canHold: boolean;
  
  // Actions
  initializeGame: () => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  movePiece: (dx: number, dy: number, dz: number) => boolean;
  rotatePiece: (axis: 'x' | 'y' | 'z') => boolean;
  dropPiece: () => void;
  hardDrop: () => void;
  holdPiece: () => void;
  placePiece: () => void;
  getGhostPosition: () => { x: number; y: number; z: number } | null;
  gameLoop: () => void;
}

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;
const FIELD_DEPTH = 10;

export const useTetris = create<TetrisState>()(
  subscribeWithSelector((set, get) => ({
    gameState: "ready",
    score: 0,
    level: 1,
    linesCleared: 0,
    field: [],
    placedPieces: [],
    currentPiece: null,
    nextPieces: [],
    heldPiece: null,
    canHold: true,

    initializeGame: () => {
      console.log("Initializing Tetris game");
      const emptyField = Array(FIELD_WIDTH).fill(null).map(() =>
        Array(FIELD_HEIGHT).fill(null).map(() =>
          Array(FIELD_DEPTH).fill(false)
        )
      );

      const nextPieces = [
        getRandomPiece(),
        getRandomPiece(),
        getRandomPiece()
      ];

      set({
        gameState: "ready",
        score: 0,
        level: 1,
        linesCleared: 0,
        field: emptyField,
        placedPieces: [],
        currentPiece: null,
        nextPieces,
        heldPiece: null,
        canHold: true
      });

      // Auto-start the game
      setTimeout(() => get().startGame(), 100);
    },

    startGame: () => {
      const { nextPieces } = get();
      const newPiece = nextPieces[0];
      const newNextPieces = [
        ...nextPieces.slice(1),
        getRandomPiece()
      ];

      console.log("Starting game with piece:", newPiece.type);
      set({
        gameState: "playing",
        currentPiece: newPiece,
        nextPieces: newNextPieces
      });
    },

    pauseGame: () => {
      console.log("Pausing game");
      set({ gameState: "paused" });
    },

    resumeGame: () => {
      console.log("Resuming game");
      set({ gameState: "playing" });
    },

    restartGame: () => {
      console.log("Restarting game");
      get().initializeGame();
    },

    movePiece: (dx: number, dy: number, dz: number) => {
      const { currentPiece, field, gameState } = get();
      if (gameState !== "playing" || !currentPiece) return false;

      const newPiece = {
        ...currentPiece,
        x: currentPiece.x + dx,
        y: currentPiece.y + dy,
        z: currentPiece.z + dz
      };

      if (!checkCollision(newPiece, field)) {
        set({ currentPiece: newPiece });
        console.log(`Moved piece to (${newPiece.x}, ${newPiece.y}, ${newPiece.z})`);
        return true;
      }
      
      return false;
    },

    rotatePiece: (axis: 'x' | 'y' | 'z') => {
      const { currentPiece, field, gameState } = get();
      if (gameState !== "playing" || !currentPiece) return false;

      const rotatedShape = rotatePieceShape(currentPiece.shape, axis);
      const rotatedPiece = {
        ...currentPiece,
        shape: rotatedShape
      };

      if (!checkCollision(rotatedPiece, field)) {
        set({ currentPiece: rotatedPiece });
        console.log(`Rotated piece around ${axis} axis`);
        return true;
      }

      return false;
    },

    dropPiece: () => {
      get().movePiece(0, -1, 0);
    },

    hardDrop: () => {
      const { currentPiece, field } = get();
      if (!currentPiece) return;

      let newY = currentPiece.y;
      while (true) {
        const testPiece = { ...currentPiece, y: newY - 1 };
        if (checkCollision(testPiece, field)) {
          break;
        }
        newY--;
      }

      set({ currentPiece: { ...currentPiece, y: newY } });
      get().placePiece();
      console.log("Hard dropped piece");
    },

    holdPiece: () => {
      const { currentPiece, heldPiece, canHold, nextPieces } = get();
      if (!canHold || !currentPiece) return;

      let newCurrentPiece: Piece;
      let newNextPieces = nextPieces;

      if (heldPiece) {
        newCurrentPiece = {
          ...heldPiece,
          x: Math.floor(FIELD_WIDTH / 2),
          y: FIELD_HEIGHT - 2,
          z: Math.floor(FIELD_DEPTH / 2)
        };
      } else {
        newCurrentPiece = nextPieces[0];
        newNextPieces = [...nextPieces.slice(1), getRandomPiece()];
      }

      const newHeldPiece = {
        ...currentPiece,
        x: 0,
        y: 0,
        z: 0
      };

      set({
        currentPiece: newCurrentPiece,
        heldPiece: newHeldPiece,
        nextPieces: newNextPieces,
        canHold: false
      });
      
      console.log("Held piece:", newHeldPiece.type);
    },

    placePiece: () => {
      const { currentPiece, field, placedPieces, nextPieces } = get();
      if (!currentPiece) return;

      // Place the piece in the field and add to placedPieces array
      const newField = [...field];
      const newPlacedPieces = [...placedPieces];
      
      currentPiece.shape.forEach(block => {
        const x = currentPiece.x + block.x;
        const y = currentPiece.y + block.y;
        const z = currentPiece.z + block.z;
        
        if (x >= 0 && x < FIELD_WIDTH && y >= 0 && y < FIELD_HEIGHT && z >= 0 && z < FIELD_DEPTH) {
          newField[x][y][z] = true;
          newPlacedPieces.push({
            x: x,
            y: y,
            z: z,
            color: currentPiece.color
          });
        }
      });

      // Clear completed lines/layers
      const { clearedField, clearedPlacedPieces, linesCleared: newLinesCleared } = clearCompleteLines(newField, newPlacedPieces);
      const { score, level, linesCleared } = get();
      const newScore = score + (newLinesCleared * 100 * level);
      const totalLines = linesCleared + newLinesCleared;
      const newLevel = Math.floor(totalLines / 10) + 1;

      // Check for game over
      const newPiece = nextPieces[0];
      const newNextPieces = [...nextPieces.slice(1), getRandomPiece()];

      if (checkCollision(newPiece, clearedField)) {
        console.log("Game Over!");
        set({ gameState: "gameOver" });
        return;
      }

      set({
        field: clearedField,
        placedPieces: clearedPlacedPieces,
        currentPiece: newPiece,
        nextPieces: newNextPieces,
        score: newScore,
        level: newLevel,
        linesCleared: totalLines,
        canHold: true
      });

      if (newLinesCleared > 0) {
        console.log(`Cleared ${newLinesCleared} lines/layers`);
      }
    },

    getGhostPosition: () => {
      const { currentPiece, field } = get();
      if (!currentPiece) return null;

      let ghostY = currentPiece.y;
      while (true) {
        const testPiece = { ...currentPiece, y: ghostY - 1 };
        if (checkCollision(testPiece, field)) {
          break;
        }
        ghostY--;
      }

      return {
        x: currentPiece.x,
        y: ghostY,
        z: currentPiece.z
      };
    },

    gameLoop: () => {
      const { gameState, currentPiece, field } = get();
      if (gameState !== "playing" || !currentPiece) return;

      // Check if current piece should be placed
      const testPiece = { ...currentPiece, y: currentPiece.y - 1 };
      if (checkCollision(testPiece, field)) {
        get().placePiece();
      }
    }
  }))
);
