---
id: routes
title: Routes
sidebar_label: Routes
---

You can easily bind a route path to a controller method.
Routes path are defined in the same way as in [expressjs](https://expressjs.com/en/guide/routing.html) router.

Each route class has the following methods:

 - `path` - same as in expressjs.
 - `method` - one of `get`,`post`,`patch`,`delete`,`put`. default `get`.
 - `action` - the action function the will be invoked to handle the route.
 - `middleware` - middleware function the will be invoked before the controller. If the `next` function is not called or called with an error, the controller won`t be created.
## Path
path can be defined with `path`,`get`,`post`,`del`,`put`,`patch`
path can be static string ,dynamic params or regex expressions 

```typescript
import {Controller,IRequest,IResponse,get,post,del,Methods,method,path} from '@appolo/route';
import {inject} from '@appolo/inject';

@controller()
export class TestController extends Controller{
    @inject() dataManager:DataManager

    @get("/test/:userId/:accountId")
    public test (req:IRequest, res:IResponse){
        return this.dataManager.getData(req.params.userId);
    }

    @del("/test/:userId")
    public test2 (req:IRequest, res:IResponse){
        return this.dataManager.getData(req.params.userId);
    }

    @post("/test/:file(^\\d+).png")
    public test3 (req:IRequest, res:IResponse){
        return this.dataManager.getData(req.params.file);
    }
    
    @path("/test/:userId/somepath")
    @method(Methods.Put)
    public test2 (req:IRequest, res:IResponse){
        return this.dataManager.getData(req.params.userId);
    }

}
```

## Prefix
prefix to all routes in the controller can be added using `@controller([preix])`.
```typescript
import {Controller,IRequest,IResponse,get,post} from '@appolo/route';
import {inject} from '@appolo/inject';

@controller("/api/v1/")
export class TestController extends Controller{
    @inject() dataManager:DataManager

    @get("/test/:userId")
    public test (req:IRequest, res:IResponse){
        return this.dataManager.getData(req.params.userId);
    }
}
```

> `@controller("/api/v1/")` will add `/api/v1/` prefix to all routes in this controller

You can return response by using `res.send`
```typescript
@controller()
export class Test2Controller extends Controller{
   @inject() dataManager:DataManager

   @post("/test2/:userId")
   public test (req:IRequest, res:IResponse) {
   	res.status(400)
   	    .header("someHeader","someValue")
   	    .send("someData");
   }
}
```
## Create
You can also define routes using `app.route.createRoute`
```typescript
import {controller,inject,Controller,IRequest,IResponse,Methods} from '@appolo/route';
import {inject,init} from '@appolo/inject';

@controller()
export class TestController extends Controller{
    @inject() private dataManager:DataManager
    @inject() private app:App
    
    @init()
    private init(){
        app.route.createRoute<TestController>(TestController)
            .path("/test/")
            .method(Methods.GET)
            .action(c=>c.test)
    }

    
    public test (req:IRequest, res:IResponse) {
        res.send(this.dataManager.getData());
    }
 }
```

or using discovery
```typescript
let route  = Discovery.createRoute(SomeController,"someAction"); // Route<SomeController>
route.path("/some/path")

route = Discovery.getRoute(SomeController,"someAction") // Route<SomeController>
route.method("post")

```
## Order
you can set the route order if 2 route collide.

in the example `/test/:id` will catch also `/test/somepath`
we can solve this using the `order` decorator

```typescript
import {controller,inject,Controller,IRequest,IResponse,order} from '@appolo/route';

@controller()
export class TestController extends Controller{

    @get("/test/:id")
    @order(2)
    public action1 (req:IRequest, res:IResponse) {
        res.send("ok");
    }
    
    @get("/test/somepath")
    @order(1)
    public action2 (req:IRequest, res:IResponse) {
        res.send("ok");
    }

 }
```

## Global
global routes `*` and `/` are ordered last

you can catch not found routes using `*`
```typescript
@controller()
export class TestController extends Controller{

    @get("/")
    public notFound (req:IRequest, res:IResponse) {
        res.send("index");
    }

    @get("*")
    public notFound (req:IRequest, res:IResponse) {
        res.send("notfound");
    }
 }
```

