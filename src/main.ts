import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!!

const context = canvas.getContext('2d')!!

type Rect = {
  x: number
  y: number
  width: number
  height: number
  color: string
}

type Text = {
  x: number
  y: number
  text: string
  color: string
}

const entities: any[] = []
const playerSize = 32
const player = {
  rect: {
    x: (canvas.width - playerSize) / 2,
    y: (canvas.height - playerSize) / 2,
    width: playerSize,
    height: playerSize,
    color: 'red',
  },
}

const gameState = {
  isRunning: true,
}

const scoreBoard = {
  text: {
    x: 10,
    y: 32,
    text: 'Score: 0',
    color: 'white',
  },
  score: 0,
}

function setup() {
  entities.length = 0
  player.rect.x = (canvas.width - playerSize) / 2
  player.rect.y = (canvas.height - playerSize) / 2
  scoreBoard.score = 0
  entities.push(player)
  entities.push(scoreBoard)
  keysPressed.clear()
  gameState.isRunning = true
}

function drawRect(rect: Rect) {
  context.fillStyle = rect.color
  context.fillRect(rect.x, rect.y, rect.width, rect.height)
}

function drawText(text: Text) {
  context.fillStyle = text.color
  context.font = '24px Arial'
  context.fillText(text.text, text.x, text.y)
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)

  for (const entity of entities) {
    if (entity.rect) {
      drawRect(entity.rect)
    }
    if (entity.text) {
      drawText(entity.text)
    }
  }
}

function update() {
  if (!gameState.isRunning) {
    return
  }
  spawnCubes()
  movePlayer()
  moveCubes()
  incrementScore()
  checkCollisions()
  wrapEntities()
}

function checkCollisions() {
  // Check if the player is colliding with any cubes
  for (const entity of entities) {
    if (entity.rect && entity !== player) {
      if (
        player.rect.x < entity.rect.x + entity.rect.width &&
        player.rect.x + player.rect.width > entity.rect.x &&
        player.rect.y < entity.rect.y + entity.rect.height &&
        player.rect.y + player.rect.height > entity.rect.y
      ) {
        // Collision detected!
        gameState.isRunning = false
        alert(`Game over! Your score was ${Math.floor(scoreBoard.score)}`)
        setup()
      }
    }
  }
}

function incrementScore() {
  // Increment score every second that the player is alive
  scoreBoard.score += 1 / 60
  scoreBoard.text.text = `Score: ${Math.floor(scoreBoard.score)}`
}

function moveCubes() {
  for (const entity of entities) {
    if (entity.velocity) {
      entity.rect.x += entity.velocity.x
      entity.rect.y += entity.velocity.y
    }
  }
}

function spawnCubes() {
  if (Math.random() < 0.01) {
    const cubeSize = 32
    const cube = {
      velocity: {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
      },
      rect: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: cubeSize,
        height: cubeSize,
        color: getRandomColor(),
      },
    }
    // Make sure the cube doesn't spawn too close to the player
    if (
      Math.abs(cube.rect.x - entities[0].rect.x) < 100 &&
      Math.abs(cube.rect.y - entities[0].rect.y) < 100
    ) {
      return
    }

    entities.push(cube)
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function wrapEntities() {
  for (const entity of entities) {
    if (entity.rect) {
      if (entity.rect.x > canvas.width) {
        entity.rect.x = 0
      }
      if (entity.rect.x < 0) {
        entity.rect.x = canvas.width
      }
      if (entity.rect.y > canvas.height) {
        entity.rect.y = 0
      }
      if (entity.rect.y < 0) {
        entity.rect.y = canvas.height
      }
    }
  }
}

const keysPressed = new Set<string>()

function movePlayer() {
  if (keysPressed.has('ArrowLeft') || keysPressed.has('a')) {
    entities[0].rect.x -= 5
  }
  if (keysPressed.has('ArrowRight') || keysPressed.has('d')) {
    entities[0].rect.x += 5
  }
  if (keysPressed.has('ArrowUp') || keysPressed.has('w')) {
    entities[0].rect.y -= 5
  }
  if (keysPressed.has('ArrowDown') || keysPressed.has('s')) {
    entities[0].rect.y += 5
  }
}

function handleInput() {
  // Read keys and add them to the set
  document.addEventListener('keydown', (event) => {
    keysPressed.add(event.key)
  })
  document.addEventListener('keyup', (event) => {
    keysPressed.delete(event.key)
  })
}

setup()

// Don't do this
// while (true) {
//   update()
//   render()
// }

// Also don't do this
// while (true) {
//   requestAnimationFrame(() => {
//     update()
//     render()
//   })
// }

function loop() {
  handleInput()
  update()
  render()
  requestAnimationFrame(loop)
}

loop()
