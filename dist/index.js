'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.Level = void 0;
(function (Level) {
    Level[Level["LOW"] = 0] = "LOW";
    Level[Level["MEDIUM"] = 1] = "MEDIUM";
    Level[Level["HIGH"] = 2] = "HIGH";
})(exports.Level || (exports.Level = {}));

var EventHandler = /** @class */ (function () {
    function EventHandler() {
        this.callbacks = new Map();
        this.currentTimeout = undefined;
        this.running = false;
    }
    return EventHandler;
}());
var OptimizedEventListener = /** @class */ (function () {
    function OptimizedEventListener(type) {
        this.type = type;
        this.lowHandler = new EventHandler();
        this.mediumHandler = new EventHandler();
        this.highHandler = new EventHandler();
    }
    OptimizedEventListener.prototype.onEventLow = function () {
        var _this = this;
        if (this.lowHandler.running) {
            return;
        }
        if (this.lowHandler.currentTimeout) {
            window.clearTimeout(this.lowHandler.currentTimeout);
        }
        this.lowHandler.currentTimeout = window.setTimeout(function () {
            _this.lowHandler.running = true;
            _this.lowHandler.callbacks.forEach(function (value) { return value(); });
            _this.lowHandler.running = false;
        }, 100);
    };
    OptimizedEventListener.prototype.onEventMedium = function () {
        var _this = this;
        if (!this.mediumHandler.currentTimeout) {
            this.mediumHandler.currentTimeout = window.setTimeout(function () {
                _this.mediumHandler.currentTimeout = undefined;
                _this.mediumHandler.callbacks.forEach(function (value) { return value(); });
            }, 100);
        }
    };
    OptimizedEventListener.prototype.onEventHigh = function () {
        this.highHandler.callbacks.forEach(function (value) { return value(); });
    };
    OptimizedEventListener.prototype.onEvent = function () {
        this.onEventLow();
        this.onEventMedium();
        this.onEventHigh();
    };
    /**
     * @param name Unique name for the callback
     * @param level Level for the frequency of the callback
     * @param callback Callback function
     */
    OptimizedEventListener.prototype.add = function (name, callback, level) {
        var _this = this;
        if (!this.size()) {
            window.addEventListener(this.type, function () { return _this.onEvent(); });
        }
        this.lowHandler.callbacks.delete(name);
        this.mediumHandler.callbacks.delete(name);
        this.highHandler.callbacks.delete(name);
        switch (level) {
            case exports.Level.LOW:
                this.lowHandler.callbacks.set(name, callback);
                break;
            case exports.Level.MEDIUM:
                this.mediumHandler.callbacks.set(name, callback);
                break;
            case exports.Level.HIGH:
                this.highHandler.callbacks.set(name, callback);
                break;
        }
    };
    OptimizedEventListener.prototype.remove = function (name) {
        var _this = this;
        this.lowHandler.callbacks.delete(name);
        this.mediumHandler.callbacks.delete(name);
        this.highHandler.callbacks.delete(name);
        if (!this.size()) {
            window.removeEventListener(this.type, function () { return _this.onEvent(); });
        }
    };
    OptimizedEventListener.prototype.size = function () {
        return this.lowHandler.callbacks.size + this.mediumHandler.callbacks.size + this.highHandler.callbacks.size;
    };
    return OptimizedEventListener;
}());

var OptimizedEvents = /** @class */ (function () {
    function OptimizedEvents() {
        this.listeners = new Map();
    }
    OptimizedEvents.prototype.add = function (type, name, callback, level) {
        if (level === void 0) { level = exports.Level.HIGH; }
        if (!this.listeners.has(type)) {
            this.listeners.set(type, new OptimizedEventListener(type));
        }
        this.listeners.get(type).add(name, callback, level);
    };
    OptimizedEvents.prototype.remove = function (type, name) {
        if (!this.listeners.has(type)) {
            return;
        }
        this.listeners.get(type).remove(name);
    };
    return OptimizedEvents;
}());
var INSTANCE = new OptimizedEvents();

exports.Listener = OptimizedEventListener;
exports.default = INSTANCE;
