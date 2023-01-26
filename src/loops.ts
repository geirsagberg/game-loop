import { handleInput } from './input'
import { render } from './render'
import { update } from './update'

export function createDisplaySyncedLoop() {
  let lastUpdate = 0
  const tick = (now = 0) => {
    const deltaTime = now - lastUpdate
    lastUpdate = now
    handleInput()
    update(deltaTime)
    render()
    requestAnimationFrame(tick)
  }
  return tick
}

export function createFixedLoop(targetFps: number) {
  let lastUpdate = 0
  const frameTime = 1000 / targetFps
  const tick = (now = 0) => {
    const deltaTime = now - lastUpdate
    if (deltaTime > frameTime) {
      lastUpdate = now - (deltaTime % frameTime)
      handleInput()
      update(deltaTime)
      render()
    }
    requestAnimationFrame(tick)
  }
  return tick
}
