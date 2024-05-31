import { Car } from '../Models/Car.js'
import {
  AccelerationCommand,
  BrakeCommand,
  CarCommand,
  TurnLeftCommand,
  TurnRightCommand,
} from './CarCommand.js'
import { InputAction } from './InputAction.js'

export class InputHandler {
  private static _instance: InputHandler
  private static _keyboardActions: {
    [name: string]: { action: InputAction; command: CarCommand }
  }

  public static get instance(): InputHandler {
    return this._instance || (this._instance = new this())
  }

  constructor() {
    window.addEventListener('keydown', event => {
      if (InputHandler._keyboardActions) {
        for (const item of Object.values(InputHandler._keyboardActions)) {
          if (item.action.checkKeyCode(event.keyCode)) {
            item.action.pressed = true
          }
        }
      }
    })

    window.addEventListener('keyup', event => {
      if (InputHandler._keyboardActions) {
        for (const item of Object.values(InputHandler._keyboardActions)) {
          if (item.action.checkKeyCode(event.keyCode)) {
            item.action.pressed = false
          }
        }
      }
    })
  }

  public static initKeyboardActions(car: Car) {
    this.addKeyboardAction('W', new InputAction([87]), new AccelerationCommand(car))
    this.addKeyboardAction('S', new InputAction([83]), new BrakeCommand(car))
    this.addKeyboardAction('A', new InputAction([65]), new TurnLeftCommand(car))
    this.addKeyboardAction('D', new InputAction([68]), new TurnRightCommand(car))
  }

  public static removeKeyboardActions() {
    InputHandler._keyboardActions = null
  }

  private static addKeyboardAction(
    name: string,
    action: InputAction,
    command: CarCommand
  ): void {
    if (!InputHandler._keyboardActions) {
      InputHandler._keyboardActions = {}
    }

    InputHandler._keyboardActions[name] = {
      action,
      command,
    }
  }

  public static updateKeyboardActions(): void {
    if (InputHandler._keyboardActions) {
      for (const item of Object.values(InputHandler._keyboardActions)) {
        if (item.action.pressed) {
          item.command.execute()
        }
      }
    }
  }
}

InputHandler.instance
