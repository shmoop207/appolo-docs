---
id: logger
title: Logger
sidebar_label: Logger
---
logger module for appolo build with [pino](https://github.com/pinojs/pino) and [sentry](https://sentry.io)

## Installation

```typescript
npm i @appolo/logger
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `prettyInProduction` | pretty print in production env if false will use `JSON.strigify`  | `boolean`|  `false`|
| `sentry` | optional object to define sentry | `object` | `null` |
| `sentry.dsn` | sentry dsn url | `string` | `null` |
| `sentry.opts` | sentry object [options](https://docs.sentry.io/clients/node/config/)| `object` | `{}` |

in config/modules/all.ts

```typescript
import {LoggerModule} from '@appolo/logger';

export = async function (app: App) {
   await app.module(LoggerModule);
   //or with sentry
   await app.module(new LoggerModule({sentry:{dns:"http://sentry-dsn"}});
}
```

## Usage
now logger instance can be inject
```typescript
import {ILogger} from '@appolo/logger';

@define()
export class SomeManager(){
    @inject() logger:Ilogger

    someMethod(){
        try{
            this.logger.info("log something")
        }catch(e){
            this.logger.error("some error",{e,someParam:"aa"})
        }
    }
}

```
static logger
```typescript
import {Logger} from '@appolo/logger';

@define()
export class SomeManager(){

    someMethod(){
        try{
            Logger.logger.info("log something")
        }catch(e){
            Logger.logger.error("some error",{e})
        }
    }
}

```

## API
#### `error(msg: string, ...args: any[])`
#### `warn(msg: string, ...args: any[])`
#### `fatal(msg: string, ...args: any[])`
#### `info(msg: string, ...args: any[])`
#### `debug(msg: string, ...args: any[]`