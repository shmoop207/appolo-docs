---
id: init-method
title: Init Method
sidebar_label: Init Method
---

The `init` method will be called after all instances were created and all the properties injected.
```javascript
@define()
@singleton()
class FooManager{
    get name(){return 'foo'; }
}
@define()
export class FooController{
    @inject() fooManager:FooManager

    @initMethod()
    initialize(){
        this.name = this.fooManager.name
    }
    get name () {return this.name}
}

var fooController = injector.getObject('fooController');
fooController.name // foo
```
> You don't have a guarantee which initMethod will be called first.<br>
 If the init method return promise the injector will **not** wait for the result.
 if you need ordered class init you can use the [`Bootstrap`](application/bootstrap.md) class

```javascript
import {define,singleton,inject,bootstrap,IBootstrap} from 'appolo';

@define()
@bootstrap()
export class Bootstrap implements IBootstrap{
    @inject() someManager1:SomeManager1
    @inject() someManager2:SomeManager2

    public async run(){
        await this.someManager1.init();
        await this.someManager2.init();
    }
}
 ```