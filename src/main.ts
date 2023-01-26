import { createLoop } from './loops'
import './style.css'
import { setup } from './systems'

setup()

createLoop({
  targetFps: 60,
  targetUps: 60,
})()
