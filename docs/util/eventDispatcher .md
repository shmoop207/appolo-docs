---
id: event-dispatcher
title: Event Dispatcher
sidebar_label: Event Dispatcher
---

Appolo has a built-in event dispatcher to enable classes to listen to and fire events.
Event Dispatcher has the following methods

## Usage
```typescript
import {define,singleton,initMethod,inject,EventDispatcher} from 'appolo';

@define()
@singleton()
export class FooManager extends EventDispatcher{
    public notifyUsers(){
        this.fireEvent('someEventName',{someData:'someData'})
    }
}
@define()
export class FooController {
    @inject() fooManager:FooManager;
    @initMethod()
    public async initialize(){
        this.fooManager.on('someEventName',(data)=>{
            this.doSomething(data.someData)
        },this);

        //or with promise
        let data = await  this.fooManager.on('someEventName')
    }
    doSomething(data){...}
}
```

## API

### on
#### `on(event,callback,[scope])`
add an event listener
- event - event name.
- callback - callback function that will triggered on event name.
- scope - optional, the scope of the callback function default: this.
### once
#### `once(event,[callback],[scope])`
add an event listener will be called only once if no callback passed a promise will be returned
- event - event name.
- callback - callback function that will triggered on event name.
- scope - optional, the scope of the callback function default: this.
### un
#### `un(event,callback,[scope])`
remove an event listener. All the arguments must be === to the onces used in the on method, or else it won`t be removed.
- event - event name.
- callback - callback function.
- scope - optional, the scope of the callback function.
### fireEvent
#### `fireEvent(event,[arguments])`
fireEvent - triggers the callback functions of a given event name
- eventName - name of the event
- arguments - all other arguments will be passed to the callback function
### removeAllListeners
#### `removeAllListeners()`
removes all event listeners
### removeListenersByScope
#### `removeListenersByScope(scope)`
removes all event listeners by given scope
### hasListener
#### `hasListener(event,callback,[scope]):boolean`
return true if listener exists

