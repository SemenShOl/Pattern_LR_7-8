import { Storage } from '../Storage/Storage.js';
import { Vector2 } from './Vector2.js';
var Point = (function () {
    function Point(coordinate) {
        this.coordinate = coordinate;
    }
    return Point;
}());
export { Point };
var Track = (function () {
    function Track() {
        this.points = Storage.getData('TRACK_POINTS');
        this.checkPoints = [];
        this.mainLine = [];
        this.firstLine = [];
        this.secondLine = [];
        this.trackWidth = 55;
    }
    Track.prototype.update = function () {
        this.updatePoints();
        this.mainLine = this.computeBezierCurve(this.points);
        this.updateCheckPoints();
        this.updateCarRespawn();
        this.firstLine = this.computeTrackLine(this.mainLine, this.trackWidth);
        this.secondLine = this.computeTrackLine(this.mainLine, -this.trackWidth);
    };
    Track.prototype.updatePoints = function () {
        this.points[1].coordinate.x =
            2 * this.points[0].coordinate.x - this.points[11].coordinate.x;
        this.points[1].coordinate.y =
            2 * this.points[0].coordinate.y - this.points[11].coordinate.y;
        this.points[4].coordinate.x =
            2 * this.points[3].coordinate.x - this.points[2].coordinate.x;
        this.points[4].coordinate.y =
            2 * this.points[3].coordinate.y - this.points[2].coordinate.y;
        this.points[7].coordinate.x =
            2 * this.points[6].coordinate.x - this.points[5].coordinate.x;
        this.points[7].coordinate.y =
            2 * this.points[6].coordinate.y - this.points[5].coordinate.y;
        this.points[10].coordinate.x =
            2 * this.points[9].coordinate.x - this.points[8].coordinate.x;
        this.points[10].coordinate.y =
            2 * this.points[9].coordinate.y - this.points[8].coordinate.y;
    };
    Track.prototype.updateCheckPoints = function () {
        this.checkPoints[0] = this.mainLine[9];
        this.checkPoints[1] = this.mainLine[Math.floor(this.mainLine.length / 4)];
        this.checkPoints[2] = this.mainLine[Math.floor(this.mainLine.length / 1.5)];
    };
    Track.prototype.getFirstLine = function () {
        return this.firstLine;
    };
    Track.prototype.getSecondLine = function () {
        return this.secondLine;
    };
    Track.prototype.updateCarRespawn = function () {
        var offset = 180;
        var point1 = this.mainLine[this.mainLine.length - offset];
        var point2 = this.mainLine[this.mainLine.length - offset + 1];
        if (point1 && point2) {
            Storage.setData('SPAWN_CAR_POSITION', point2);
            Storage.setData('SPAWN_CAR_POSITION_ANGLE', Math.atan2(point2.y - point1.y, point2.x - point1.x));
        }
    };
    Track.prototype.computeTrackLine = function (coords, ratio) {
        var line = [];
        var n = new Vector2(0, 0);
        for (var i = 0; i < coords.length; i++) {
            n.x = -coords[(i + 1) % coords.length].y + coords[i].y;
            n.y = coords[(i + 1) % coords.length].x - coords[i].x;
            var mag = Math.sqrt(n.x * n.x + n.y * n.y);
            n.x = n.x / mag;
            n.y = n.y / mag;
            line.push(new Vector2(coords[i].x + n.x * ratio, coords[i].y + n.y * ratio));
        }
        return line;
    };
    Track.prototype.computeBezierCurve = function (points, step) {
        if (step === void 0) { step = 0.01; }
        var coords = [];
        for (var i = 0; i < points.length; i += 3) {
            for (var t = 0; t <= 1; t += step) {
                coords.push(new Vector2(Math.pow(1 - t, 3) * points[i].coordinate.x +
                    3 * t * Math.pow(1 - t, 2) * points[i + 1].coordinate.x +
                    3 * Math.pow(t, 2) * (1 - t) * points[i + 2].coordinate.x +
                    Math.pow(t, 3) * points[(i + 3) % points.length].coordinate.x, Math.pow(1 - t, 3) * points[i].coordinate.y +
                    3 * t * Math.pow(1 - t, 2) * points[i + 1].coordinate.y +
                    3 * Math.pow(t, 2) * (1 - t) * points[i + 2].coordinate.y +
                    Math.pow(t, 3) * points[(i + 3) % points.length].coordinate.y));
            }
        }
        return coords;
    };
    Track.prototype.getCheckPoints = function () {
        return this.checkPoints;
    };
    Track.prototype.draw = function (ctx) {
        this.drawCurve(ctx, this.firstLine);
        this.drawCurve(ctx, this.secondLine);
        this.drawFinish(ctx, this.firstLine, this.secondLine);
    };
    Track.prototype.drawFinish = function (ctx, firstLine, secondLine) {
        ctx.beginPath();
        ctx.moveTo(firstLine[0].x, firstLine[0].y);
        ctx.lineTo(secondLine[0].x, secondLine[0].y);
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.closePath();
    };
    Track.prototype.drawCurve = function (ctx, coords) {
        ctx.beginPath();
        ctx.moveTo(coords[0].x, coords[0].y);
        coords.forEach(function (coordinate) {
            ctx.lineTo(coordinate.x, coordinate.y);
        });
        ctx.lineTo(coords[0].x, coords[0].y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'grey';
        ctx.stroke();
        ctx.closePath();
    };
    return Track;
}());
export { Track };
//# sourceMappingURL=Track.js.map