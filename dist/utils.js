import { Vector2 } from './Models/Vector2.js';
export function rotateObject(point, turningAngle) {
    return new Vector2(Math.cos(turningAngle) * point.x + Math.sin(turningAngle) * point.y, Math.sin(turningAngle) * point.x - Math.cos(turningAngle) * point.y);
}
export function getVectorLength(point) {
    return Math.sqrt(point.x * point.x + point.y * point.y);
}
export var trackData = {
    WIDTH: 512,
    HEIGHT: 288,
    DPI_HEIGHT: 576,
    DPI_WIDTH: 1024,
    COLOR_CAR_BODY: '#4582A9',
    COLOR_CAR_ROOF: '#111111',
    COLOR_CAR_TIRE_TRACKS: '#9C9C9C',
    SPAWN_CAR_POSITION: { x: 318.7289140000001, y: 128.09802500000006 },
    SPAWN_CAR_POSITION_ANGLE: 0.6334573114830311,
    TRACK_POINTS: [
        { coordinate: { x: 672, y: 125 }, isChangeable: true },
        { coordinate: { x: 1019, y: -109 }, isChangeable: false },
        { coordinate: { x: 1017, y: 339 }, isChangeable: true },
        { coordinate: { x: 824, y: 318 }, isChangeable: true },
        { coordinate: { x: 631, y: 297 }, isChangeable: false },
        { coordinate: { x: 624, y: 237 }, isChangeable: true },
        { coordinate: { x: 464, y: 447 }, isChangeable: true },
        { coordinate: { x: 304, y: 657 }, isChangeable: false },
        { coordinate: { x: 1, y: 381 }, isChangeable: true },
        { coordinate: { x: 124, y: 134 }, isChangeable: true },
        { coordinate: { x: 247, y: -113 }, isChangeable: false },
        { coordinate: { x: 325, y: 359 }, isChangeable: true },
    ],
    BEST_LAPS: [{ name: 'Anton', lapTime: 8.517200000000036 }],
};
//# sourceMappingURL=utils.js.map