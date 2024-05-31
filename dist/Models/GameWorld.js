import { InputHandler } from '../Input/InputHandler.js';
import { Storage } from '../Storage/Storage.js';
import { Car } from './Car.js';
import { Track } from './Track.js';
var GameWorld = (function () {
    function GameWorld() {
        this.gameObjects = [];
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.style.width = Storage.getData('WIDTH');
        this.canvas.style.height = Storage.getData('HEIGHT');
        this.canvas.width = Storage.getData('DPI_WIDTH');
        this.canvas.height = Storage.getData('DPI_HEIGHT');
    }
    GameWorld.prototype.add = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    GameWorld.prototype.draw = function () {
        var _this = this;
        this.gameObjects.forEach(function (gameObject) {
            gameObject.draw(_this.context);
        });
    };
    GameWorld.prototype.update = function () {
        var _this = this;
        var car;
        var track;
        this.gameObjects.forEach(function (gameObject) {
            if (gameObject instanceof Car) {
                car = gameObject;
            }
            else if (gameObject instanceof Track) {
                track = gameObject;
            }
        });
        if (car && track && car.isCollidingWithRacingTrack(track)) {
            car.toRespawn();
        }
        this.gameObjects.forEach(function (gameObject) {
            gameObject.update();
            gameObject.draw(_this.context);
        });
    };
    GameWorld.prototype.startRendering = function () {
        var _this = this;
        var renderLoop = function (timestamp) {
            if (_this.previousTimeStamp == null) {
                _this.previousTimeStamp = timestamp;
            }
            Storage.deltaTime = (timestamp - _this.previousTimeStamp) / 1000;
            _this.previousTimeStamp = timestamp;
            InputHandler.updateKeyboardActions();
            _this.update();
            _this.draw();
            requestAnimationFrame(renderLoop);
        };
        renderLoop();
    };
    return GameWorld;
}());
export { GameWorld };
//# sourceMappingURL=GameWorld.js.map