// LICENSE is MIT
//
// Copyright (c) 2023
//


/**
 * 事件监听器
 */
interface EventBus {
    emit(name: any, ...args:any): EventBus;
    emitAll(name: any, ...args:any): EventBus;


    on(name: any, listener: (...args: any) => void): EventBus;
    once(name: any, listener: (...args: any) => void): EventBus;


    off(name: any, listener?: any): EventBus;
    offs(...names: string[]): EventBus;


    has(name: string): boolean;
    listeners(name: string): Array<Function | null>;

}


declare const EventBus: EventBus;

export default EventBus
