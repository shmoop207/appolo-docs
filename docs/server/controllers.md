---
id: controllers
title: Controllers
sidebar_label: Controllers
---

Controllers are classes that handle routes request.
In order for the router to be able to handle the request, a controller class must extend `Controller`.
Each controller action will be called with [request](http://expressjs.com/en/4x/api.html#req) and [response](http://expressjs.com/en/4x/api.html#res) objects.

controller action can return promise or an object that will be passed to `res.send(someData)` with status code 200

```javascript
import {controller,inject,Controller,IRequest,IResponse} from 'appolo';

@controller()
export class LoginController extends Controller{
    @inject() authManager:AuthManager;

    @post("/login/")
    public async loginUser(req:IRequest,res:IResponse,model:any){
        return  await this.authManager.validateUser(req.body.username,req.body.password)
    }

    @get("/some/data")
    public async loginUser(req:IRequest,res:IResponse,model:any){
        return  {some:"data"}
    }

    @get("/some/data2")
    public async loginUser(req:IRequest,res:IResponse,model:any){
        res.status(200).send({some:"data"})
    }
}
```

## Static Controllers
By default, `appolo` creates a new controller instance for every request.
If you do not need a new controller instance for every request, you can inherit from `StaticController` which is singleton.
```javascript
import {controller,singleton,inject,lazy,StaticController,IRequest,IResponse} from 'appolo';
@controller()
@singleton()
@lazy()
export class LoginController extends StaticController{
    @inject() authManager:AuthManager;

    @post("/login/")
    public aynsc loginUser(req:IRequest,res:IResponse){
        return await this.authManager.validateUser(req.body.username,req.body.password)
	}
}

```

## Gzip
it is possible to compress the response with gzip by calling `res.gzip`
```javascript
import {controller,singleton,inject,IRequest,IResponse} from 'appolo';
@controller()
export class LoginController extends StaticController{

    @get("/some/data")
    public aynsc loginUser1(req:IRequest,res:IResponse){
        res.gzip();
        return return {data:"some big data"}
	}

	@get("/some/data2")
    public aynsc loginUser2(req:IRequest,res:IResponse){
        res.gzip().send({data:"some big data"})
    }

    @get("/some/data3")
    @gzip()
    public aynsc loginUser3(req:IRequest,res:IResponse){
        return {data:"some big data"}
    }
}

```


## Headers
specify a custom response header
```javascript
import {controller,singleton,inject,IRequest,IResponse,header} from 'appolo';
@controller()
export class LoginController extends StaticController{


	@get("/some/data")
    @header('Cache-Control', 'none')
    public aynsc loginUser(req:IRequest,res:IResponse){
        return {data:"user"}
    }

    @get("/some/data2")
    public aynsc loginUser(req:IRequest,res:IResponse){
        res.header("Cache-Control","none")
        return {data:"user"}
    }
}
```

## StatusCode
specify a custom statusCode default `200`
```javascript
import {controller,IRequest,IResponse,statusCode} from 'appolo';
@controller()
export class LoginController extends StaticController{


	@get("/some/data")
    @statusCode(201)
    public aynsc loginUser(req:IRequest,res:IResponse){
        return {data:"user"}
    }

    @get("/some/data2")
    public aynsc loginUser(req:IRequest,res:IResponse){
        res.status(201)
        return {data:"user"}
    }
}
```

## Custom Decorators
you can define your own custom response decorators

```javascript
import {controller,IRequest,IResponse,customRouteDecorator} from 'appolo';

let myDecorator = customRouteDecorator((req:IRequest,res:IResponse,route)=>{
    res.setHeader("x-test","true")
    res.status(201)
}

@controller()
export class LoginController extends StaticController{

	@get("/some/data")
    @myDecorator
    public aynsc loginUser(req:IRequest,res:IResponse){
        return {data:"user"}
    }
}
```