import './style.css'

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!!

const context = canvas.getContext('2d')!!

context.fillRect(0, 0, canvas.width, canvas.height)
