---
id: lazy
title: Lazy
sidebar_label: Lazy
---

lazy class will be created only when injected for the first time
```javascript
@define()
@singleton()
@lazy()
class BarManager{
    get name(){return 'bar'; }
}

@define()
class BuzzController{
    @inject() barManager:BarManager
    get name () {return this.foo.name}
 }
var buzzController = injector.getObject('buzzController');
console.log(buzzController.name) // bar

```

## Lazy Inject
lazy inject will inject property method that will create the inject object once called
```javascript
@define()
@singleton()
@lazy()
class BarManager{
    get name(){return 'bar'; }
}

@define()
class BuzzController{
    @injectLazy() barManager:BarManager
    get name () {return this.foo.name}
 }
var buzzController = injector.getObject('buzzController');
console.log(buzzController.name) //only now bar manager will created
```