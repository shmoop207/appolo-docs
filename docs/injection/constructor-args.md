---
id: constructor-args
title: Constructor Args
sidebar_label: Constructor Args
---

you can inject objects to constructor arguments you can inject object instance by id or by value.
```javascript
@define()
@singleton()
export class FooManager{
    get name () {
        return 'foo'
    }
}
@define()
export class BuzzController{
	constructor (@injectParam() fooManager:FooManager,name:string) {
	    this.fooManager = fooManager;
	    this.name = name;
	}
	name () {
	    return   this.fooManager.name +this.name
	}
}

var buzzController = injector.getObject<BuzzController>(BuzzController,["buzz"]);
console.log(buzzController.name()) // foobuzz
```

> it is not recommended to inject objects to constructor because it can easily lead to  circular reference.

it is not possible to use injected object via `@inject` in the constructor because the it is not yet injected.

```javascript
@define()
@singleton()
export class FooManager{
    get name () {
        return 'foo'
    }
}
@define()
export class BuzzController{

    @inject fooManager:FooManager;

	constructor () {
	    this.name =  this.fooManager.name();
	    //throw Error this.fooManager is undefined
	}

}

let buzzController = injector.getObject<BuzzController>(BuzzController);
```

> use @initMethod to solve this

```javascript
@define()
@singleton()
export class FooManager{
    get name () {
        return 'foo'
    }
}
@define()
export class BuzzController{

    @inject fooManager:FooManager;

	@initMethod()
	init(){
        this.name =  this.fooManager.name();
	}
}

let buzzController = injector.getObject<BuzzController>(BuzzController);
```