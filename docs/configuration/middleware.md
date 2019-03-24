---
id: middlewares
title: Middlewares
sidebar_label: Middlewares
---

You can configure express middleware or add custom middleware by adding configuration files to the middlewares folder.
The middlewares configuration file is called after the environment files were loaded.

in file config/middlewares/all.ts
```typescript
import favicon = require('static-favicon');
import bodyParser = require("body-parser");
import {App,IRequest,IResponse,NextFn}  from 'appolo';

export = function (app: App) {
    app.use(bodyParser.json());
    app.use(function (req:IRequest, res: IResponse, next: NextFn) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });
    app.use(favicon());
}
```
