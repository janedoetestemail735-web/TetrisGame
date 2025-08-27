export enum TetrisControls {
  moveLeft = 'moveLeft',
  moveRight = 'moveRight',
  moveForward = 'moveForward',
  moveBackward = 'moveBackward',
  rotateX = 'rotateX',
  rotateY = 'rotateY',
  rotateZ = 'rotateZ',
  softDrop = 'softDrop',
  hardDrop = 'hardDrop',
  hold = 'hold',
  pause = 'pause',
}

export const controlsMap = [
  { name: TetrisControls.moveLeft, keys: ['KeyA', 'ArrowLeft'] },
  { name: TetrisControls.moveRight, keys: ['KeyD', 'ArrowRight'] },
  { name: TetrisControls.moveForward, keys: ['KeyW', 'ArrowUp'] },
  { name: TetrisControls.moveBackward, keys: ['KeyS', 'ArrowDown'] },
  { name: TetrisControls.rotateX, keys: ['KeyQ'] },
  { name: TetrisControls.rotateY, keys: ['KeyE'] },
  { name: TetrisControls.rotateZ, keys: ['KeyR'] },
  { name: TetrisControls.softDrop, keys: ['Space'] },
  { name: TetrisControls.hardDrop, keys: ['Enter'] },
  { name: TetrisControls.hold, keys: ['KeyC'] },
  { name: TetrisControls.pause, keys: ['KeyP'] },
];
