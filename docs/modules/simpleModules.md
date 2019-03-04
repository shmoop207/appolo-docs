---
id: simple-modules
title: Simple Modules
sidebar_label:Simple Modules
---

Third party modules can be easily loaded into appolo inject and used in the inject container.<br>
Each module must call `app.module` before it can be used by appolo launcher.<br>
`app.module` accepts a function as an argument.<br>
The last argument to that function must be the `next` function: modules are loaded serially, so each module must call the next function or return a promise in order to continue the launch process.
Other arguments to the function are object which you wish to inject into the module (these objects must be injected earlier).

By default, each module can inject:
- env - environment object
- inject - injector - to add objects to the injector
- app - the app instance

In config/modules/all.ts
```typescript
import {App} from 'appolo';
export = async function(app:App){
    await app.module(async function(env:IEnv,inject:Injector,app:App){
        let myModuleObject = {data:'test'};
        await toSomeThing();
        inject.addObject('myModuleObject',myModuleObject);
    });
}
```
Now we can inject myModuleObject to any class
```typescript
import {define,singleton,initMethod,inject} from 'appolo';
@define()
export  class AuthMiddleware{
    @inject('myModuleObject') testObject:any
    public doSomeThing() {
        return this.testObject.data; //return 'test'
    }
}
```

module can loaded in parallel
```typescript
import {App} from 'appolo';
export = async function(app:App){
    await app.module(SomeModule,SomeModule2);
}
```

A logger module example with [winston](https://github.com/flatiron/winston)<br>
In config/modules/all.ts
```typescript
import winston = require('winston');
import {App} from 'appolo';
export = async function(app:App){
    await appolo.module(async function(env:any,inject:appolo.Injector){
        transports = [];
        transports.push(new (winston.transports.Console)({
            json: false,
            timestamp: true
        })

        let logger = new (winston.Logger)({  transports: transports});
        inject.addObject('logger', logger);
    });
```
Now we you inject logger anywhere we need it
```typescript
import {define,inject} from 'appolo';
@define()
export class DataManager{
    @inject() logger:Logger
    public initialize(){
        this.logger.info("dataManager initialized",{someData:'someData'})
    }
}
```