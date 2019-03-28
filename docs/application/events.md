---
id: events
title: Events
sidebar_label: Events
---
Appolo Hooks allows you to add custom middleware request lifecycle

## RouteAdded
Called on incoming request

in file config/middlewares/all.ts
```typescript
import {define,hooks} from 'appolo';

export = function (app: App) {
     app.on(hooks.OnRequest,function(req,res,next) {
        //do something
        next()
     })
}
```
## PreMiddleware
Called pre route middleware and after app middleware

in file config/middlewares/all.ts
```typescript
import {define,hooks} from 'appolo';

export = function (app: App) {
     app.addHook(hooks.PreMiddleware,function(req,res,next) {
        //do something
        next()
     })
 }  
```

## PreHandler
Called before controller run

in file config/middlewares/all.ts
```typescript
import {define,hooks} from 'appolo';

export = function (app: App) {
     app.addHook(hooks.PreHandler,function(req,res,next) {
        //do something
        next()
     })
}
```

## OnSend
Called before response returned you can change the payload

in file config/middlewares/all.ts
```typescript
import {define,hooks} from 'appolo';

export = function (app: App) {
     app.addHook(hooks.OnSend,function(data,req,res,next) {
        let newData= data.replace('some-text', 'some-new-text')
        next(null,newData)
     })
}
```

## OnResponse
Called after response sent

in file config/middlewares/all.ts
```typescript
import {define,hooks} from 'appolo';

export = function (app: App) {
     app.addHook(hooks.OnResponse,function(req,res,next) {
        next()
     })
}
```

## OnError
Called on error and before all app errors

in file config/middlewares/all.ts
```typescript
import {define,hooks} from 'appolo';

export = function (app: App) {
     app.addHook(hooks.OnError,function(err,req,res,next) {
        next(err)
     })
}
```

