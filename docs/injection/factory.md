---
id: factory
title: Factory
sidebar_label: Factory
---

factory object must have implement `IFactory` method that will be called in order to inject the object instance.
the `get` method can return promise;

the return value of the get method will be injected to the inject properties;

```javascript
@define()
@singleton()
class BarManager{
    get name(){return 'bar'; }
}

@define()
@singleton()
@factory()
class Foo implements IFactory<BarManager>{
    @inject() barManager:BarManager;
    async get ():Promise<BarManager> {
    //do some thing async
        return this.barManager;
    }
}

@define()
class BuzzController{
    @inject() foo:BarManager
    get name () {return this.foo.name}
 }
var buzzController = injector.getObject('buzzController');
console.log(buzzController.name) // bar
```