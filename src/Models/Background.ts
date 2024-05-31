import { Storage } from '../Storage/Storage.js'

export class Background implements IGameObject {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.fillStyle = '#eeeeee'
    ctx.fillRect(
      0,
      0,
      Storage.getData('DPI_WIDTH'),
      Storage.getData('DPI_HEIGHT')
    )
    ctx.closePath()
  }
  update(): void {}
}
