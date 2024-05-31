import { trackData } from '../utils.js';
var Storage = (function () {
    function Storage() {
        localStorage.setItem('data', JSON.stringify(trackData));
        Storage._data = JSON.parse(localStorage.getItem('data'));
        if (Storage._data)
            return;
    }
    Object.defineProperty(Storage, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Storage, "deltaTime", {
        get: function () {
            return this._deltaTime;
        },
        set: function (deltaTime) {
            this._deltaTime = deltaTime;
        },
        enumerable: false,
        configurable: true
    });
    Storage.save = function () {
        localStorage.setItem('data', JSON.stringify(this._data));
    };
    Storage.setData = function (key, value) {
        this._data[key] = value;
    };
    Storage.getData = function (key) {
        return this._data[key];
    };
    return Storage;
}());
export { Storage };
window.onunload = function () {
    Storage.save();
};
var StorageInstance = Storage.instance;
//# sourceMappingURL=Storage.js.map