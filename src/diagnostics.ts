const frameTimes: number[] = []
let frameIndex = 0
const frameSamples = 10

export function measureFps(deltaTime: number): number {
  frameTimes[frameIndex] = deltaTime
  frameIndex = (frameIndex + 1) % frameSamples
  const frameTimeAverage = frameTimes.reduce((a, b) => a + b) / frameSamples
  return 1000 / frameTimeAverage
}
