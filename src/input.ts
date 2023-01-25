export const pressedKeys = new Set<string>()

export function handleInput() {
  // Read keys and add them to the set
  document.addEventListener('keydown', (event) => {
    pressedKeys.add(event.key)
  })
  document.addEventListener('keyup', (event) => {
    pressedKeys.delete(event.key)
  })
}
