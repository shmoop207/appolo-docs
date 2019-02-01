---
id: validation
title: Validation
sidebar_label: Validation
---

You can add validations to your routes. The action controller will be called only if the route params are valid.<br/>
Validations are done using [joi module](https://github.com/hapijs/joi  ).<br/>
The validator takes request params from `req.param` , `req.query` and `req.body`. After validation, all request params will be available on `req.model`.

```javascript
import {controller,inject,Controller,IRequest,IResponse,validator,get} from 'appolo';
@controller()
export class TestController extends Controller{
    @inject() dataManager:DataManager

    @get("/search/")
    @validations({
        search:validator.string().required(),
        pageSize:validator.number().default(20),
        page:validator.number().default(1)
    })
    public async search (req:IRequest, res:IResponse,model:any) {
        let {search,page,pageSize} = model;
        return await this.dataManager.getSearchResults(search,page,pageSize)
    }
}
```
If the request params are not valid, appolo will return a `400 Bad Request` response with detailed validation errors.
```javascript
{
    status: 400,
    message: "Bad Request",
    error: "userId is required"  }
```

## Validation Model
`appolo` also supports validation model
```javascript
export class SearchModel extends RouteModel {
    @validationParam(validator.string().required())
    search: string;

    @validationParam(validator.number().required())
    pageSize: number

    @validationParam(validator.number().default(1))
    page: number
}
```

then in the controller
```javascript
import {controller,inject,Controller,IRequest,IResponse,validator,get} from 'appolo';
@controller()
export class TestController extends Controller{

    @inject() dataManager:DataManager

    @get("/search/")
    @validations(SearchModel)
    public async search (req:IRequest, res:IResponse,model:SearchModel) {
       let {search,page,pageSize} = model;
       return await this.dataManager.getSearchResults(search,page,pageSize)
    }
}
```