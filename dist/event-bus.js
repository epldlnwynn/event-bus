"use strict";
exports.__esModule = true;
var EventBus = /** @class */ (function () {
    function EventBus(listeners) {
        this._listeners = listeners || {};
    }
    EventBus.prototype.emit = function (name) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        name = name.toString();
        if (this.has(name)) {
            var _e = this.listeners(name);
            if (_e.length === 1) {
                _e.map(function (f) { f.apply(f, args), f.once && _this.offs(name); });
            }
            else {
                _e = _e.map(function (f) {
                    if (f.length === args.length) {
                        f.apply(f, args);
                        if (f.once)
                            return null;
                    }
                    return f;
                }).filter(function (f) { return f != null; });
                _e.length > 0 ? (this._listeners[name] = _e) : this.offs(name);
            }
        }
        return this;
    };
    EventBus.prototype.emitAll = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        name = name.toString();
        if (this.has(name)) {
            var _e = this.listeners(name).map(function (f) { return f === null || f === void 0 ? void 0 : f.apply(f, args), f; }).filter(function (f) { return !f.once; });
            _e.length > 0 ? (this._listeners[name] = _e) : this.offs(name);
        }
        return this;
    };
    EventBus.prototype.on = function (name, listener) {
        name = name.toString();
        var i = this._findIndex(name, listener);
        if (i === -1) {
            if (!this._listeners[name])
                this._listeners[name] = [];
            this._listeners[name].push(listener);
        }
        return this;
    };
    EventBus.prototype.once = function (name, listener) {
        // @ts-ignore
        return listener.once = 1, this.on(name, listener);
    };
    EventBus.prototype.off = function (name, listener) {
        name = name.toString();
        var i = this._findIndex(name, listener);
        if (i > -1) {
            var c = this.count(name);
            if (c === 1) {
                this.offs(name);
            }
            else {
                this._listeners[name].splice(i, 1);
            }
        }
        return this;
    };
    EventBus.prototype.offs = function () {
        var _this = this;
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        names.map(function (name) {
            _this._listeners[name.toString()] && delete _this._listeners[name.toString()];
        });
        return this;
    };
    EventBus.prototype.listeners = function (name) {
        var _e = this._listeners[name];
        return _e ? _e : [];
    };
    EventBus.prototype.has = function (name) { return this.listeners(name).length > 0; };
    EventBus.prototype.count = function (name) { return this.listeners(name).length; };
    EventBus.prototype._findIndex = function (name, listener) {
        if (this.has(name) === false)
            return -1;
        if (!listener)
            return 0;
        var _e = this.listeners(name);
        for (var i = 0; i < _e.length; i++) {
            var f = _e[i];
            if (!f)
                continue;
            if ((f.name === listener.name && f.length === listener.length) || f.toString() === listener.toString())
                return i;
        }
        return -1;
    };
    EventBus.prototype._reflectApply = function (target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
    };
    return EventBus;
}());
var eventBus = new EventBus();
// @ts-ignore
//if (typeof window !== "undefined") window.eventBus = eventBus;
exports["default"] = eventBus;
//# sourceMappingURL=event-bus.js.map