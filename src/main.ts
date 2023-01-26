import { createFixedLoop } from './loops'
import './style.css'
import { setup } from './systems'

setup()

createFixedLoop(60)()
