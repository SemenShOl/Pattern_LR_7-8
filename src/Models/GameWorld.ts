import { InputHandler } from '../Input/InputHandler.js'
import { Storage } from '../Storage/Storage.js'
import { Car } from './Car.js'
import { Track } from './Track.js'

export class GameWorld {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private gameObjects: IGameObject[] = []
  private previousTimeStamp: number

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')
    this.canvas.style.width = Storage.getData('WIDTH')
    this.canvas.style.height = Storage.getData('HEIGHT')
    this.canvas.width = Storage.getData('DPI_WIDTH')
    this.canvas.height = Storage.getData('DPI_HEIGHT')
  }

  add(gameObject: IGameObject): void {
    this.gameObjects.push(gameObject)
  }
  
  draw(): void {
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(this.context)
    })
  }

  update(): void {
    let car: Car | undefined
    let track: Track | undefined
    
    this.gameObjects.forEach(gameObject => {
      if (gameObject instanceof Car) {
        car = gameObject
      } else if (gameObject instanceof Track) {
        track = gameObject
      }
    })

    if (car && track && car.isCollidingWithRacingTrack(track)) {
        car.toRespawn()
    }

    this.gameObjects.forEach(gameObject => {
      gameObject.update()
      gameObject.draw(this.context)
    })
  }

  startRendering(): void {
    const renderLoop = (timestamp?: number): void => {
      if (this.previousTimeStamp == null) {
        this.previousTimeStamp = timestamp
      }
      
      Storage.deltaTime = (timestamp - this.previousTimeStamp) / 1000
      this.previousTimeStamp = timestamp

      InputHandler.updateKeyboardActions()

      this.update()
      this.draw()

      requestAnimationFrame(renderLoop)
    }
    renderLoop()
  }
}
