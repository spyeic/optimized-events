import { Level, Callback } from "./types";
declare class OptimizedEventListener<K extends keyof WindowEventMap> {
    private readonly type;
    private readonly lowHandler;
    private readonly mediumHandler;
    private readonly highHandler;
    constructor(type: K);
    private onEventLow;
    private onEventMedium;
    private onEventHigh;
    private onEvent;
    /**
     * @param name Unique name for the callback
     * @param level Level for the frequency of the callback
     * @param callback Callback function
     */
    add(name: string, callback: Callback, level: Level): void;
    remove(name: string): void;
    size(): number;
}
export default OptimizedEventListener;
