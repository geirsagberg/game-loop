import { pressedKeys } from './input'
import { gameState } from './state'
import {
  checkCollisions,
  incrementScore,
  moveCubes,
  movePlayer,
  setup,
  spawnCubes,
  wrapEntities,
} from './systems'

export function update() {
  if (gameState.isRunning) {
    spawnCubes()
    movePlayer()
    moveCubes()
    incrementScore()
    checkCollisions()
    wrapEntities()
  } else {
    if (pressedKeys.has(' ')) {
      setup()
    }
  }
}
