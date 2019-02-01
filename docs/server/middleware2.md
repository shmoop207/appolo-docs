---
id: middleware2
title: Middleware
sidebar_label: Middleware
---

A middleware class will run before the action of the controller is invoked.
The middleware class must extend must extend `appolo.Middleware` and implement the run method.

```javascript
import {define,inject,Middleware,IRequest,IResponse,NextFn,IRouteOptions} from 'appolo';
@define()
export class AuthMiddleware extends Middleware {
    @inject() authManager:AuthManager;
    public async run(req:appolo.IRequest,res:IResponse,next:NextFn,route:IRouteOptions){
        try{
            let user =  await this.authManager.validateToken(req.headers.authorization)
            req.user = user;
            next();
        }catch(e){
            this.sendUnauthorized();
        }
    }
}
```

now you can added the middleware to our route
```javascript
@controller()
export class LoginController extends Controller{
    @post("/someroute/")
    @middaleware(AuthMiddleware)
    public async someAction(req:IRequest,res:IResponse){
        return req.user
    }
}
```
## Express Like Middleware
you can also use any express or custom middleware functions
```javascript

const someMiddleware = (req,res,next)=>{
    req.uesr = "aa";
    next()
}


@controller()
export class LoginController extends Controller{
    @post("/someroute/")
    @middaleware(someMiddleware)
    public async someAction(req:IRequest,res:IResponse){
        return req.user
    }
}
```
