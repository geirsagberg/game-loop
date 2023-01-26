import { worldHeight, worldWidth } from './context'

export const entities: any[] = []
export const playerSize = 32
export const player = {
  rect: {
    x: (worldWidth - playerSize) / 2,
    y: (worldHeight - playerSize) / 2,
    width: playerSize,
    height: playerSize,
    color: 'red',
  },
}

export const gameState = {
  isRunning: true,
}

const highScore = Number(window.localStorage.getItem('highScore') ?? 0)

export const scoreBoard = {
  text: {
    x: 10,
    y: 32,
    text: 'Score: 0',
    color: 'white',
  },
  score: 0,
  highScore,
}
