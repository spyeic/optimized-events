import Listener from "./listener";
import { Callback, Level } from "./types";

class OptimizedEvents {
    listeners: Map<string, Listener<keyof WindowEventMap>> = new Map();

    add<K extends keyof WindowEventMap>(type: K, name: string, callback: Callback, level: Level = Level.HIGH): void {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, new Listener(type));
        }
        this.listeners.get(type)!.add(name, callback, level);
    }

    remove<K extends keyof WindowEventMap>(type: K, name: string): void {
        if (!this.listeners.has(type)) {
            return;
        }
        this.listeners.get(type)!.remove(name);
    }
}

const INSTANCE = new OptimizedEvents();

export default INSTANCE;
