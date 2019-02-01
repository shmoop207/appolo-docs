---
id: dependency-injection
title: Dependency Injection
sidebar_label: Dependency Injection
---

Appolo has a powerful [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) system based on [`appolo-inject`](https://github.com/shmoop207/appolo-inject).

It enables you to write organised, testable code based on the [loose coupling](https://en.wikipedia.org/wiki/Loose_coupling) pattern.

You can always access the injector via `app.injector`.

## Usage
```javascript
import {define,singleton,initMethod,inject,IFactory,factory} from 'appolo';

@define()
@singleton()
export class DataRemoteManager {
    getData(){ ...}
}
```

```javascript
@define()
@singleton()
@factory()
export class DataManager implement IFactory<IDataManager> {
    @inject() dataRemoteManager:DataRemoteManager

    get(){
        return this.dataRemoteManager;
    }
}

```

```javascript
@controller()
export class FooController{
    @inject() dataManager:IDataManager
    constructor() {
        this.data = null
    }

    @initMethod()
    initialize(){
        this.data =  this.dataManager.getData();
    }

    @get("/data")
    getData(){
        return this.data;
    }
}
```

## Constructor Injection
Using constructor injection or method parameter injection
```javascript
import {define,singleton,injectParam,initMethod,inject} from 'appolo';
@define()
@singleton()
export class DataManager {
    getData(){ ... }
}

@define()
class FooController{
    constructor(@injectParam() dataManager:DataManager) {
        this.dataManager = dataManager;
    }

    @initMethod()
    public initialize(){
        this.data =  this.dataManager.getData();
    }

    public test(@injectParam() logger:Logger){... }
}
```
> It is not recommended to inject objects to constructor because it can lead to circular reference.

## Inherited injections
Inherited injections are supported as well.

Anything you inject on a base class will be available to child classes.


```javascript
import {define,initMethod,inject} from 'appolo';

export class BaseManager {
    @inject() protected env:any
    private getData(){...}
}

@define()
class FooManager extends BaseManager{
    @initMethod()
    public initialize(){
        //the env object in injected from the base class
        console.log(this.env.test)
    }
}
```
> Remember not to use `@define` on the parent class.
