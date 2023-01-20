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

const rects: Rect[] = []

function setup() {
  rects.push({
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    color: 'red',
  })
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  for (const rect of rects) {
    context.fillStyle = rect.color
    context.fillRect(rect.x, rect.y, rect.width, rect.height)
  }
}

function update() {
  for (const rect of rects) {
    rect.x += 1
    rect.y += 1
    if (rect.x > canvas.width) {
      rect.x = 0
    }
    if (rect.y > canvas.height) {
      rect.y = 0
    }
  }
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
  update()
  render()
  requestAnimationFrame(loop)
}

loop()
