import { TetrominoType, TETROMINO_SHAPES, TETROMINO_COLORS } from "./pieces";
import { Piece, Block } from "../stores/useTetris";

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;
const FIELD_DEPTH = 10;

export function getRandomPiece(): Piece {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const shape = TETROMINO_SHAPES[randomType];
  
  return {
    type: randomType,
    shape: shape.blocks,
    color: TETROMINO_COLORS[randomType],
    x: Math.floor(FIELD_WIDTH / 2),
    y: FIELD_HEIGHT - 2,
    z: Math.floor(FIELD_DEPTH / 2)
  };
}

export function checkCollision(piece: Piece, field: boolean[][][]): boolean {
  for (const block of piece.shape) {
    const x = piece.x + block.x;
    const y = piece.y + block.y;
    const z = piece.z + block.z;
    
    // Check boundaries
    if (x < 0 || x >= FIELD_WIDTH || 
        y < 0 || y >= FIELD_HEIGHT || 
        z < 0 || z >= FIELD_DEPTH) {
      return true;
    }
    
    // Check field collision
    if (field[x][y][z]) {
      return true;
    }
  }
  
  return false;
}

export function rotatePieceShape(shape: Block[], axis: 'x' | 'y' | 'z'): Block[] {
  return shape.map(block => {
    const { x, y, z } = block;
    
    switch (axis) {
      case 'x':
        return { x, y: -z, z: y };
      case 'y':
        return { x: z, y, z: -x };
      case 'z':
        return { x: -y, y: x, z };
      default:
        return block;
    }
  });
}

export function clearCompleteLines(
  field: boolean[][][], 
  placedPieces?: any[]
): { 
  clearedField: boolean[][][], 
  clearedPlacedPieces: any[], 
  linesCleared: number 
} {
  let clearedField = [...field];
  let clearedPlacedPieces = placedPieces ? [...placedPieces] : [];
  let linesCleared = 0;

  // Check for complete horizontal layers (XZ plane)
  for (let y = 0; y < FIELD_HEIGHT; y++) {
    let isLayerComplete = true;
    
    for (let x = 0; x < FIELD_WIDTH && isLayerComplete; x++) {
      for (let z = 0; z < FIELD_DEPTH && isLayerComplete; z++) {
        if (!clearedField[x][y][z]) {
          isLayerComplete = false;
        }
      }
    }
    
    if (isLayerComplete) {
      // Remove pieces from the cleared layer and shift down
      if (placedPieces) {
        // Remove all pieces in the cleared layer
        clearedPlacedPieces = clearedPlacedPieces.filter(piece => piece.y !== y);
        // Shift down all pieces above the cleared layer
        clearedPlacedPieces = clearedPlacedPieces.map(piece => 
          piece.y > y ? { ...piece, y: piece.y - 1 } : piece
        );
      }
      
      // Remove the complete layer and shift everything down in field array
      for (let removeY = y; removeY < FIELD_HEIGHT - 1; removeY++) {
        for (let x = 0; x < FIELD_WIDTH; x++) {
          for (let z = 0; z < FIELD_DEPTH; z++) {
            clearedField[x][removeY][z] = clearedField[x][removeY + 1][z];
          }
        }
      }
      
      // Clear the top layer
      for (let x = 0; x < FIELD_WIDTH; x++) {
        for (let z = 0; z < FIELD_DEPTH; z++) {
          clearedField[x][FIELD_HEIGHT - 1][z] = false;
        }
      }
      
      linesCleared++;
      y--; // Check this layer again since everything shifted down
    }
  }

  return { clearedField, clearedPlacedPieces, linesCleared };
}
