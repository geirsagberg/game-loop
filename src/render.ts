import { context, worldHeight, worldWidth } from './context'
import { entities } from './state'

function drawRect(rect: Rect) {
  context.fillStyle = rect.color
  context.fillRect(rect.x, rect.y, rect.width, rect.height)
}

function drawText(text: TextObj) {
  context.fillStyle = text.color
  context.font = '24px Arial'
  context.fillText(text.text, text.x, text.y)
}

export function render() {
  context.clearRect(0, 0, worldWidth, worldHeight)

  for (const entity of entities) {
    if (entity.rect) {
      drawRect(entity.rect)
    }
    if (entity.text) {
      drawText(entity.text)
    }
  }
}
