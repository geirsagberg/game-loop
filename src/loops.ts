import { handleInput } from './input'
import { render } from './render'
import { update } from './update'

interface Loop {
  tick(): void
}

export class DisplaySyncedLoop implements Loop {
  private previousTotalTime = 0

  tick = (totalTime: number = 0) => {
    const deltaTime = totalTime - this.previousTotalTime
    handleInput()
    update(deltaTime)
    render()
    this.previousTotalTime = totalTime
    requestAnimationFrame(this.tick)
  }
}

export class TimedLoop implements Loop {
  private msPerFrame: number
  private previousTotalTime = 0

  constructor(fps: number) {
    this.msPerFrame = 1000 / fps
  }

  tick = () => {
    const totalTime = performance.now()
    const deltaTime = totalTime - this.previousTotalTime
    handleInput()
    update(deltaTime)
    render()
    const elapsed = performance.now() - totalTime
    this.previousTotalTime = totalTime
    setTimeout(this.tick, Math.max(0, this.msPerFrame - elapsed))
  }
}
