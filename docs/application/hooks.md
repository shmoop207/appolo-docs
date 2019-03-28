---
id: hooks
title: Hooks
sidebar_label: Hooks
---
Appolo Hooks allows you to add custom middleware request lifecycle

## Usage
### App
hooks defined using the `app` `addHook` method
```typescript
import {define,Hooks} from 'appolo';

export = function (app: App) {
     app.addHook(Hooks.OnRequest,function(req,res,next) {
        //do something
        next()
     })
}
```
### Routes
hooks can be added on routes using the `hook` decorator
```typescript
import {define,controller,inject,Controller,IRequest,IResponse,Middleware} from 'appolo';


@define()
export class SomeMiddleware extends Middleware {
    @inject() authManager:AuthManager;
    public async run(req:IRequest,res:IResponse,next:NextFn){
        try{
            req.test=true;
            next();
        }catch(e){
            this.sendUnauthorized();
        }
    }
}

@controller()
export class LoginController extends Controller{

    @post("/login/")
    @hook(Hooks.OnRequest,SomeMiddleware)
    public  loginUser(req:IRequest,res:IResponse,model:any){
        return  this.authManager.login(req.body.username,req.body.password)
    }
}
```

### Middleware
hooks function can be also appolo middleware
```typescript
import {controller,inject,Controller,IRequest,IResponse} from 'appolo';

@controller()
export class LoginController extends Controller{

    @post("/login/")
    @hook(Hooks.OnRequest,(req,res,next)=>{
        req.test=true;
        next()
    })
    public  loginUser(req:IRequest,res:IResponse,model:any){
        return   this.authManager.login(req.body.username,req.body.password)
    }
}
```

## Hooks
### OnRequest
Called on incoming request

in file config/middlewares/all.ts
```typescript
import {define,Hooks} from 'appolo';

export = function (app: App) {
     app.addHook(hooks.OnRequest,function(req,res,next) {
        //do something
        next()
     })
}
```
### PreMiddleware
Called pre route middleware and after app middleware

in file config/middlewares/all.ts
```typescript
import {define,Hooks} from 'appolo';

export = function (app: App) {
     app.addHook(Hooks.PreMiddleware,function(req,res,next) {
        //do something
        next()
     })
 }  
```

### PreHandler
Called before controller run

in file config/middlewares/all.ts
```typescript
import {define,Hooks} from 'appolo';

export = function (app: App) {
     app.addHook(Hooks.PreHandler,function(req,res,next) {
        //do something
        next()
     })
}
```

### OnSend
Called before response returned you can change the payload

in file config/middlewares/all.ts
```typescript
import {define,Hooks} from 'appolo';

export = function (app: App) {
     app.addHook(Hooks.OnSend,function(data,req,res,next) {
        let newData= data.replace('some-text', 'some-new-text')
        next(null,newData)
     })
}
```

### OnResponse
Called after response sent

in file config/middlewares/all.ts
```typescript
import {define,Hooks} from 'appolo';

export = function (app: App) {
     app.addHook(Hooks.OnResponse,function(req,res,next) {
        next()
     })
}
```

### OnError
Called on error and before all app errors

in file config/middlewares/all.ts
```typescript
import {define,Hooks} from 'appolo';

export = function (app: App) {
     app.addHook(Hooks.OnError,function(err,req,res,next) {
        next(err)
     })
}
```

