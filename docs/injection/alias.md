---
id: alias
title: Alias
sidebar_label: Alias
---

you can add alias names to classes and get all the classes by single alias. all the alias must be `singleton`

```javascript
interface IHandler{
    name:string
}

@define()
@singleton()
@alias('IHandler')
class FooManager implements IHandler {
    get name(){return 'foo'}
}
@define()
@singleton()
@alias('IHandler')
class BarManager implements IHandler{
    get name(){return 'bar'}
}

@define()
class BuzzController{
    @injectAlias('handler') allHandlers:IHandler[]

    get name(){
        return this.allHandlers.map(obj =>obj.name).join();
    }
}

var buzzController = injector.getObject('buzzController');
buzzController.name // foobar
```

## Alias Factory
you can add alias factory names to classes and get all the classes new instance by factory method.

```javascript
interface IHandler{
    name:string
}

@define()
@aliasFactory('IHandler')
class FooManager implements IHandler{
    constructor (private _name:string) {  }
    get name():string{ return this._name }
}
@define()
@aliasFactory('IHandler')
class BarManager implements IHandler{
    public name:string
    constructor (private _name:string) {  }
    get name():string{ return this._name }
}

@define()
class BuzzController{
    @injectAliasFactory('IHandler') allHandlers:((name:string)=>IHandler)[]

    get name(){
        return this.allHandlers.map((createHandler,index) =>createHandler(index).name).join();
    }

var buzzController = injector.getObject('buzzController');
buzzController.name // 01
```