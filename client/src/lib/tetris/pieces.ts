export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L' | 'CUBE';

export interface TetrominoShape {
  blocks: { x: number; y: number; z: number }[];
}

export const TETROMINO_SHAPES: Record<TetrominoType, TetrominoShape> = {
  I: {
    blocks: [
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 }
    ]
  },
  O: {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 1, z: 0 }
    ]
  },
  T: {
    blocks: [
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 }
    ]
  },
  S: {
    blocks: [
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 1, z: 0 }
    ]
  },
  Z: {
    blocks: [
      { x: -1, y: 1, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 }
    ]
  },
  J: {
    blocks: [
      { x: -1, y: 1, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 }
    ]
  },
  L: {
    blocks: [
      { x: 1, y: 1, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 }
    ]
  },
  CUBE: {
    blocks: [
      { x: 0, y: 0, z: 0 }
    ]
  }
};

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#00f0f0', // Cyan
  O: '#f0f000', // Yellow
  T: '#a000f0', // Purple
  S: '#00f000', // Green
  Z: '#f00000', // Red
  J: '#0000f0', // Blue
  L: '#f0a000', // Orange
  CUBE: '#ff00ff' // Magenta
};
