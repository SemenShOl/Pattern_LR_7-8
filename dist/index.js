import { GameWorld } from './Models/GameWorld.js';
import { InputHandler } from './Input/InputHandler.js';
import { Background } from './Models/Background.js';
import { Car } from './Models/Car.js';
import { Telemetry } from './Models/Telemetry.js';
import { Track } from './Models/Track.js';
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
function main() {
    GameLoop();
}
main();
//# sourceMappingURL=index.js.map