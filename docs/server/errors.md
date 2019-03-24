---
id: errors
title: Errors
sidebar_label: Errors
---

by default the response will be wrapped with try catch and `InternalServerError` will be send to response.
```typescript
{
    "status": 500,
    "message": "Bad Request",
    "error": "Internal Server Error"
}
```
or you can throw custom error
```typescript
import {controller,inject,validation,Controller,IRequest,IResponse,validator} from 'appolo';

@controller()
export class LoginController extends Controller{
    @inject() authManager:AuthManager;
    @post("/login/")
    @validation("username", validator.string())
    @validation("password", validator.string())
    public async loginUser(req:IRequest,res:IResponse,model:any){
        try{
            return  await this.authManager.validateUser(model.username,model.password)
        }catch(e){
            throw new HttpError(401,"Not Found",e,{key:"value"},1000)
        }
    }
}
```

```typescript
{
    "status": 401,
    "message": "Not Foundr",
    "error":"something is wrong",
    "code":1001,
    "key":"value"
}
```

## Error Middleware
you can define custom error middleware to handle route error.
any express error middleware are also supported

```typescript
import {controller,inject,Controller,IRequest,IResponse,error} from 'appolo';

@controller()
@error(SomeErrorHandler)
export class SomeController extends Controller{
    @post("/some/path")
    public async action(req:IRequest,res:IResponse,model:any){
       throw new Error("some error")
    }
}
```

```typescript
import {inject,Controller,IRequest,IResponse,error,Middleware} from 'appolo';

@define()
export class SomeErrorHandler extends Middleware{

    catch(err:any,req:IRequest,res:IResponse,next:NextFn){
        res.status(400).send("something went wrong")
    }
}
```

## Global Error handler
global middleware will be run on all routes

in config/middlewares/all.ts
```typescript
export = function (app: App) {

    app.error(function(err:any,req:IRequest,res:IResponse,next:NextFn){
        console.log(err)
    });

    app.error(SomeErrorHandler);
}
```

## Not Found Route
when route is not found HttpError is thrown with status 404
you can catch the error by `get('*')` route or by error middleware

in config/middlewares/all.ts
```typescript
export = function (app: App) {

    app.error(function(err:any,req:IRequest,res:IResponse,next:NextFn){
        if(err instanceof HttpError && err.statusCode == 404){
            res.render("404.html")
        }
    });
}
```
