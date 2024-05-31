import { Point } from '../Models/Track.js'
import { Vector2 } from '../Models/Vector2.js'
import { trackData } from '../utils.js'
export class Storage {
  private static _instance: Storage
  private static _data: { [key: string]: any }
  private static _deltaTime: number

  private constructor() {
    localStorage.setItem('data', JSON.stringify(trackData))

    Storage._data = JSON.parse(localStorage.getItem('data'))
    if (Storage._data) return

    // Storage._data = {}
    // Storage._data['WIDTH'] = 512
    // Storage._data['HEIGHT'] = 288
    // Storage._data['DPI_HEIGHT'] = Storage._data['HEIGHT'] * 2
    // Storage._data['DPI_WIDTH'] = Storage._data['WIDTH'] * 2
    // Storage._data['COLOR_CAR_BODY'] = '#fa3d2f'
    // Storage._data['COLOR_CAR_ROOF'] = '#4287ff'
    // Storage._data['COLOR_CAR_TIRE_TRACKS'] = '#cccccc'
    // Storage._data['SPAWN_CAR_POSITION'] = new Vector2(71.71, 197.4)
    // Storage._data['SPAWN_CAR_POSITION_ANGLE'] = -1.722
    // Storage._data['TRACK_POINTS'] = [
    //   new Point(new Vector2(138, 70)),
    //   new Point(new Vector2(149, 110)),
    //   new Point(new Vector2(654, 39)),
    //   new Point(new Vector2(777, 69)),
    //   new Point(new Vector2(0, 0)),
    //   new Point(new Vector2(981, 336)),
    //   new Point(new Vector2(906, 390)),
    //   new Point(new Vector2(0, 0)),
    //   new Point(new Vector2(326, 454)),
    //   new Point(new Vector2(191, 392)),
    //   new Point(new Vector2(0, 0)),
    //   new Point(new Vector2(33, 70)),
    // ]
  }

  public static get instance(): Storage {
    return this._instance || (this._instance = new this())
  }

  public static get deltaTime(): number {
    return this._deltaTime
  }

  public static set deltaTime(deltaTime: number) {
    this._deltaTime = deltaTime
  }

  public static save(): void {
    localStorage.setItem('data', JSON.stringify(this._data))
  }

  public static setData(key: string, value: any) {
    this._data[key] = value
  }

  public static getData(key: string): any {
    return this._data[key]
  }
}

window.onunload = () => {
  Storage.save()
}

const StorageInstance = Storage.instance
