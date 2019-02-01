---
id: errors
title: Errors
sidebar_label: Errors
---

by default the response will be wrapped with try catch and `InternalServerError` will be send to response.
```javascript
{
    "status": 500,
    "message": "Bad Request",
    "error": "Internal Server Error"
}
```
or you can throw custom error
```javascript
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

```javascript
{
    "status": 401,
    "message": "Not Foundr",
    "error":"something is wrong",
    "code":1001,
    "key":"value"
}
```