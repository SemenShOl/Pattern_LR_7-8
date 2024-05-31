import { GameWorld } from '../models/GameWorld.js';
import { InputHandler } from '../input/InputHandler.js';
import { Background } from '../models/Background.js';
import { Car } from '../models/Car.js';
import { Telemetry } from '../models/Telemetry.js';
import { Track } from '../models/Track.js';
export var GameLoop = function () {
    var gameWorld = new GameWorld();
    gameWorld.startRendering();
    var car = new Car();
    var track = new Track();
    gameWorld.add(new Background());
    gameWorld.add(track);
    gameWorld.add(new Telemetry(car, track));
    gameWorld.add(car);
    InputHandler.initKeyboardActions(car);
};
//# sourceMappingURL=GameLoop.js.map