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

export function update(deltaTime: number) {
  if (gameState.isRunning) {
    spawnCubes(deltaTime)
    movePlayer(deltaTime)
    moveCubes(deltaTime)
    incrementScore(deltaTime)
    checkCollisions()
    wrapEntities()
  } else {
    if (pressedKeys.has(' ')) {
      setup()
    }
  }
}
