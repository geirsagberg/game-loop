import { pressedKeys } from './input'
import { gameState } from './state'
import {
  checkCollisions,
  incrementScore,
  moveCubes,
  movePlayer,
  setup,
  spawnCubes,
  updateFps,
  wrapEntities,
} from './systems'

export function update(deltaTime: number) {
  if (gameState.isRunning) {
    spawnCubes()
    movePlayer()
    moveCubes()
    incrementScore()
    checkCollisions()
    wrapEntities()
    updateFps(deltaTime)
  } else {
    if (pressedKeys.has(' ')) {
      setup()
    }
  }
}
