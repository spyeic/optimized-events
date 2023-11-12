## Optimized Events

### Add events handler
```typescript
import events, { Level } from "optimized-events";

events.add("scroll", "name", () => {
    console.log("scroll");
}, Level.LOW);

events.add("copy", "oncopy", () => {
    console.log("scroll");
});
```


### Remove events handler
```typescript
import events from "optimized-events";
events.remove("scroll", "name");
events.remove("copy", "oncopy");
```