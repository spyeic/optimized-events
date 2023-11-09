import { Level, Callback } from "./types";

class EventHandler {
    callbacks: Map<string, Callback> = new Map();
    currentTimeout?: number = undefined;
    running?: boolean = false;
}

class OptimizedEventListener<K extends keyof WindowEventMap> {
    private readonly type: K;
    private readonly lowHandler: EventHandler;
    private readonly mediumHandler: EventHandler;
    private readonly highHandler: EventHandler;

    constructor(type: K) {
        this.type = type;
        this.lowHandler = new EventHandler();
        this.mediumHandler = new EventHandler();
        this.highHandler = new EventHandler();
    }

    private onEventLow(): void {
        if (this.lowHandler.running) {
            return;
        }
        if (this.lowHandler.currentTimeout) {
            window.clearTimeout(this.lowHandler.currentTimeout);
        }
        this.lowHandler.currentTimeout = window.setTimeout(() => {
            this.lowHandler.running = true;
            this.lowHandler.callbacks.forEach((value) => value());
            this.lowHandler.running = false;
        }, 100);
    }

    private onEventMedium(): void {
        if (!this.mediumHandler.currentTimeout) {
            this.mediumHandler.currentTimeout = window.setTimeout(() => {
                this.mediumHandler.currentTimeout = undefined;
                this.mediumHandler.callbacks.forEach((value) => value());
            }, 100);
        }
    }

    private onEventHigh(): void {
        this.highHandler.callbacks.forEach((value) => value());
    }

    private onEvent(): void {
        this.onEventLow();
        this.onEventMedium();
        this.onEventHigh();
    }

    /**
     * @param name Unique name for the callback
     * @param level Level for the frequency of the callback
     * @param callback Callback function
     */
    add(name: string, callback: Callback, level: Level): void {
        if (!this.size()) {
            window.addEventListener(this.type, () => this.onEvent());
        }
        this.lowHandler.callbacks.delete(name);
        this.mediumHandler.callbacks.delete(name);
        this.highHandler.callbacks.delete(name);
        switch (level) {
        case Level.LOW:
            this.lowHandler.callbacks.set(name, callback);
            break;
        case Level.MEDIUM:
            this.mediumHandler.callbacks.set(name, callback);
            break;
        case Level.HIGH:
            this.highHandler.callbacks.set(name, callback);
            break;
        }
    }

    remove(name: string): void {
        this.lowHandler.callbacks.delete(name);
        this.mediumHandler.callbacks.delete(name);
        this.highHandler.callbacks.delete(name);
        if (!this.size()) {
            window.removeEventListener(this.type, () => this.onEvent());
        }
    }

    size(): number {
        return this.lowHandler.callbacks.size + this.mediumHandler.callbacks.size + this.highHandler.callbacks.size;
    }
}


export default OptimizedEventListener;
