import { handleInput } from './input'
import { render } from './render'
import { update } from './update'

export function naiveLoop() {
  handleInput()
  update()
  render()
  setTimeout(naiveLoop, 0)
}

export function displaySyncedLoop() {
  handleInput()
  update()
  render()
  requestAnimationFrame(displaySyncedLoop)
}

export function timedLoop() {
  handleInput()
  update()
  render()
  setTimeout(timedLoop, 1000 / 60)
}

export function smarterTimedLoop() {
  const msPerFrame = 1000 / 60
  const now = performance.now()
  handleInput()
  update()
  render()
  const elapsed = performance.now() - now
  setTimeout(smarterTimedLoop, Math.max(0, msPerFrame - elapsed))
}
