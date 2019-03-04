---
id: routes
title: Routes
sidebar_label: Routes
---

You can easily bind a route path to a controller method.
The routes path are defined in the same way as in [expressjs](https://expressjs.com/en/guide/routing.html) router.

Each route class has the following methods:

 - `path` - same as in expressjs.
 - `method` - one of `get`,`post`,`patch`,`delete`,`put`. default `get`.
 - `action` - the action function the will be invoked to handle the route.
 - `middleware` - middleware function the will be invoked before the controller. If the `next` function is not called or called with an error, the controller won`t be created.
 - `validation` - validations object as defined in [joi](https://github.com/hapijs/joi  ).

```typescript
import {define,inject,Controller,IRequest,IResponse,get,post} from 'appolo';

@controller("/api/v1/")
export class TestController extends Controller{
    @inject() dataManager:DataManager

    @get("/test/:userId")
    public test (req:IRequest, res:IResponse){
        return this.dataManager.getData(req.params.userId));
    }

    @get("/test/:file(^\\d+).png")
    public test (req:IRequest, res:IResponse){
        return this.dataManager.getData(req.params.file));
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

You can also define routes using appolo.route method:
```typescript
import {controller,inject,Controller,IRequest,IResponse} from 'appolo';

@controller()
export class TestController extends Controller{
    @inject() dataManager:DataManager
    public test (req:IRequest, res:IResponse) {
        res.send(this.dataManager.getData());
    }
 }

app.route<TestController>(TestController)
 .path("/test/")
 .method(appolo.Methods.GET)
 .action(c=>c.test)
```

you can catch not found routes using `*`
```typescript
@controller()
export class TestController extends Controller{

    @get("*")
    public notFound (req:IRequest, res:IResponse) {
        res.send("notfound");
    }
 }
```