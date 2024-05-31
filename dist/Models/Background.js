import { Storage } from '../Storage/Storage.js';
var Background = (function () {
    function Background() {
    }
    Background.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#eeeeee';
        ctx.fillRect(0, 0, Storage.getData('DPI_WIDTH'), Storage.getData('DPI_HEIGHT'));
        ctx.closePath();
    };
    Background.prototype.update = function () { };
    return Background;
}());
export { Background };
//# sourceMappingURL=Background.js.map