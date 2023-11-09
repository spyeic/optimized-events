import Listener from "./listener";
import { Callback, Level } from "./types";
declare class OptimizedEvents {
    listeners: Map<string, Listener<keyof WindowEventMap>>;
    add<K extends keyof WindowEventMap>(type: K, name: string, callback: Callback, level?: Level): void;
    remove<K extends keyof WindowEventMap>(type: K, name: string): void;
}
declare const INSTANCE: OptimizedEvents;
export default INSTANCE;
