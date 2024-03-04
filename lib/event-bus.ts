
class EventBus {
    protected _listeners: any;
    constructor(listeners?: any) {
        this._listeners = listeners || {};
    }

    emit(name: any, ...args:any): EventBus {
        name = name.toString()
        if (this.has(name)) {
            let _e = this.listeners(name);
            if (_e.length === 1) {
                _e.map((f: any) => { f.apply(f, args), f.once && this.offs(name) })
            } else {
                _e = _e.map((f: any) => {
                    if (f.length === args.length) {
                        f.apply(f, args);
                        if (f.once) return null;
                    }
                    return f;
                }).filter(f => f != null)
                _e.length > 0 ? (this._listeners[name] = _e) : this.offs(name)
            }
        }
        return this
    }
    emitAll(name: any, ...args:any): EventBus {
        name = name.toString()
        if (this.has(name)) {
            const _e = this.listeners(name).map(f => { return f?.apply(f, args), f }).filter((f: any) => !f.once)
            _e.length > 0 ? (this._listeners[name] = _e) : this.offs(name)
        }
        return this;
    }
    on(name: any, listener: (...args: any) => void): EventBus {
        name = name.toString()
        const i = this._findIndex(name, listener)
        if (i === -1) {
            if (!this._listeners[name]) this._listeners[name] = [];
            this._listeners[name].push(listener)
        }
        return this;
    }
    once(name: any, listener: (...args: any) => void): EventBus {
        // @ts-ignore
        return listener.once = 1, this.on(name, listener)
    }
    off(name: any, listener?: any): EventBus {
        name = name.toString()
        const i = this._findIndex(name, listener)
        if (i > -1) {
            const c = this.count(name);
            if (c === 1) {
                this.offs(name)
            } else {
                this._listeners[name].splice(i, 1)
            }
        }

        return this
    }
    offs(...names: string[]): EventBus {
        names.map(name => {
            this._listeners[name.toString()] && delete this._listeners[name.toString()];
        })
        return this
    }
    listeners(name: string): Array<Function | null> {
        const _e = this._listeners[name];
        return _e ? _e : []
    }
    has(name: string): boolean { return this.listeners(name).length > 0 }
    count(name: string): number { return this.listeners(name).length }


    protected _findIndex(name: string, listener?: any): number {
        if (this.has(name) === false) return -1
        if (!listener) return 0

        const _e = this.listeners(name);
        for (let i = 0; i < _e.length; i++) {
            const f: any = _e[i]
            if (!f) continue;
            if ((f.name === listener.name && f.length === listener.length) || f.toString() === listener.toString())
                return i;
        }

        return -1;
    }
    protected _reflectApply(target: any, receiver: any, args: any[]) {
        return Function.prototype.apply.call(target, receiver, args)
    }

}


const eventBus = new EventBus();

// @ts-ignore
//if (typeof window !== "undefined") window.eventBus = eventBus;

export default eventBus;
