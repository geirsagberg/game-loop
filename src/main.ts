import { TimedLoop } from './loops'
import './style.css'
import { setup } from './systems'

setup()

new TimedLoop(60).tick()
