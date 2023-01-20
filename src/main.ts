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

const entities: any[] = []

function setup() {
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
  entities.push(player)
}

function draw(rect: Rect) {
  context.fillStyle = rect.color
  context.fillRect(rect.x, rect.y, rect.width, rect.height)
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)

  for (const entity of entities) {
    if (entity.rect) {
      draw(entity.rect)
    }
  }
}

function update() {
  movePlayer()
  wrapEntities()
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
