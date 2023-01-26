import { createFixedIntervalLoop } from './loops'
import './style.css'
import { setup } from './systems'

setup()

createFixedIntervalLoop(60)()
