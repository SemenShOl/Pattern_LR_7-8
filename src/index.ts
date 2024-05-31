import { GameWorld } from './Models/GameWorld.js'
import { InputHandler } from './Input/InputHandler.js'
import { Background } from './Models/Background.js'
import { Car } from './Models/Car.js'
import { Telemetry } from './Models/Telemetry.js'
import { Track } from './Models/Track.js'

export const GameLoop = () => {
  const gameWorld: GameWorld = new GameWorld()
  gameWorld.startRendering()

  const car: Car = new Car()
  const track: Track = new Track()

  gameWorld.add(new Background())
  gameWorld.add(track)
  gameWorld.add(new Telemetry(car, track))
  gameWorld.add(car)

  InputHandler.initKeyboardActions(car)
}

function main(): void {
  GameLoop()
}
main()
