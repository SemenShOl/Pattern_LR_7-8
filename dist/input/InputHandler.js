import { AccelerationCommand, BrakeCommand, TurnLeftCommand, TurnRightCommand, } from './CarCommand.js';
import { InputAction } from './InputAction.js';
var InputHandler = (function () {
    function InputHandler() {
        window.addEventListener('keydown', function (event) {
            if (InputHandler._keyboardActions) {
                for (var _i = 0, _a = Object.values(InputHandler._keyboardActions); _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.action.checkKeyCode(event.keyCode)) {
                        item.action.pressed = true;
                    }
                }
            }
        });
        window.addEventListener('keyup', function (event) {
            if (InputHandler._keyboardActions) {
                for (var _i = 0, _a = Object.values(InputHandler._keyboardActions); _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.action.checkKeyCode(event.keyCode)) {
                        item.action.pressed = false;
                    }
                }
            }
        });
    }
    Object.defineProperty(InputHandler, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    InputHandler.initKeyboardActions = function (car) {
        this.addKeyboardAction('W', new InputAction([87]), new AccelerationCommand(car));
        this.addKeyboardAction('S', new InputAction([83]), new BrakeCommand(car));
        this.addKeyboardAction('A', new InputAction([65]), new TurnLeftCommand(car));
        this.addKeyboardAction('D', new InputAction([68]), new TurnRightCommand(car));
    };
    InputHandler.removeKeyboardActions = function () {
        InputHandler._keyboardActions = null;
    };
    InputHandler.addKeyboardAction = function (name, action, command) {
        if (!InputHandler._keyboardActions) {
            InputHandler._keyboardActions = {};
        }
        InputHandler._keyboardActions[name] = {
            action: action,
            command: command,
        };
    };
    InputHandler.updateKeyboardActions = function () {
        if (InputHandler._keyboardActions) {
            for (var _i = 0, _a = Object.values(InputHandler._keyboardActions); _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.action.pressed) {
                    item.command.execute();
                }
            }
        }
    };
    return InputHandler;
}());
export { InputHandler };
InputHandler.instance;
//# sourceMappingURL=InputHandler.js.map