import { handleInput } from './input'
import { render } from './render'
import { update } from './update'

export function createFixedIntervalLoop(targetUps: number) {
  let lastUpdate = 0
  let accumulatedTime = 0
  const updateInterval = 1000 / targetUps
  const tick = (now = 0) => {
    const deltaTime = now - lastUpdate
    lastUpdate = now
    accumulatedTime += deltaTime
    handleInput()
    while (accumulatedTime >= updateInterval) {
      update()
      accumulatedTime -= updateInterval
    }
    render()
    requestAnimationFrame(tick)
  }
  return tick
}
