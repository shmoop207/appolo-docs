---
id: complex-modules
title: Complex Modules
sidebar_label: Complex Modules
---

- modules can be also nested appolo apps with own `injector` and app `context` they function as independent appolo app.<br>
- module can also export  instances that will be injected to main app injector.<br>
- modules can load own nested modules.

## Module Directory Structure
```bash
|- config
    |- env
        |- all.ts
        |- production.ts
	|- modules
	    |- all.ts
|- src
    |- controllers
    |- managers
    |- services
    |- bootstrap.ts
| someModule.ts
```
module env will be merged with module parent env.

## Usage
each module must inherit from `appolo.Module`

in monitorModule.ts
```javascript
import {Module, module} from 'appolo';
import {MonitorController} from "./src/monitorController";

@module({
    exports: [MonitorController]
})
export class MonitorModule extends Module {

}
```
in src/monitorController.ts
```javascript
import {Controller, controller, get, inject} from 'appolo';
import {IEnv} from "./config/env/IEnv";

@controller("/api/monitor")
export class MonitorController extends Controller {

    @inject() env: IEnv;

    @get()
    public monitor() {
        return {ok: true, type: this.env.name}
    }
}

```
now in the main app modules
```javascript
export = async function (env, app: App) {
    await app.module(MonitorModule)
}

```

now monitoring controller is part of our app the the route `/api/monitor` in available

## Module Options
module options are define in the module constructor and can injected in any module class
```javascript
@module({
    exports: [MonitorController]
})
export class MonitorModule extends Module {
    constructor(opts: { id: string }) {
        super(opts);
    }
}
```
```javascript
@controller("/api/monitor")
export class MonitorController extends Controller {

    @inject() moduleOptions: { id: string };

    @get()
    public monitor() {
        return {ok: true, type: this.moduleOptions.id}
    }
}
```
```javascript
export = async function (env, app: App) {
    await app.module(new MonitorModule({id:"someId"}))
}
```
the options passed to constructor will be extended with default module options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `immediate` |  module will be loaded immediately when called | `boolean`|  `false`|
| `parallel` | module will be loaded in parallel modules | `boolean` | `false` |

```javascript
@module({
    exports: [MonitorController]
    immediate:true
})
export class MonitorModule extends Module {
    constructor(opts: { id: string }) {
        super(opts);
    }
}
```

or
```javascript
export = async function (env, app: App) {
    await app.module(new MonitorModule({id:"someId",immediate:true}))
}
```

## Async Modules
module can use all appolo features like async factories.<br>
the app will be launched when all modules finished loading

```javascript
@module()
export class DbModule extends Module<{ id: string }> {

    protected readonly Defaults = {
        id:"db"
    };

    constructor(opts: { id: string }) {
        super(opts);
    }
    public get exports() {
        return [{id: this.moduleOptions.id, type: DbFactory}]
    }
}
```
this will inject to main app id db this instance return from db factory
```javascript
import mongoose = require('mongoose');

@define()
@singleton()
@factory()
export class DbFactory implements IFactory<mongoose.Connection> {

    @inject() moduleOptions: {conn:string};

    async get(): Promise<mongoose.Connection> {

       const connection = await mongoose.createConnection(this.moduleOptions.conn);
       return connection
    }
}

```
in the main app load the db module
```javascript
export = async function (env, app: App) {
    await app.module(new DbModule({conn:"mongo://someurl"}))
}
```
now you can inject the db instance anywhere in the main app
```javascript
@define()
export class SomeManager{
    @inject() db:mongoose.Connection

    @initMethod()
    async initialize(){
        await this.db.collections()
    }
}

```

## Dependency injection
inner module can inject instance from parent apps
```javascript
@define()
@singleton()
export class DbManager {
    @inject() logger: ILogger;
}
```
it will look the logger instance first in the module injector if not found it will look in the module parent injector util it will reach the root injector if the instance is not found error will be thrown

## Hooks
- `beforeInitialize` - called before module initialize
- `afterInitialize` - called after module initialize
- `beforeLaunch` - called after module launch

```javascript
@module()
export class DbModule extends Module<{ id: string }> {

    public get exports() {
        return [{id: this.moduleOptions.id, type: DbFactory}]
    }

    beforeInitialize(){
        //do something
    }
}

```

## Module Properties
moduleOptions -  return module options

- `parent` -  return  module parent app
- `app` - return module app
- `rootParent` - return top root app


