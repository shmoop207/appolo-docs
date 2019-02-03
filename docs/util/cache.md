---
id: cache
title: Cache
sidebar_label: Cache
---

Cache method results using [`appolo-cache​`](https://github.com/shmoop207/appolo-cache)

## Options

| key | Description | Type | Default
| --- | --- | --- | --- |
| `maxSize` | max cache size | `number`|  `1000`|
| `maxAge` | set maximum age in ms of all cache items | `number` | `unlimited` |
| `clone` |  clone the cache result | `boolean` | `false` |
| `interval` | set cache refresh interval in ms | `number` | `undefined` |
| `resolver` | function to get the cache key by default the first argument will be used as the cache key. | `function` | `undefined` |
| `multi` | if no resolver defined use all the arguments as key else use the first argument as key  | `boolean` | `false` |
| `peek` |  use peek method instead of get | `boolean` | `false` |
| `refresh` |  refresh cache on half maxAge expire | `boolean` | `false` |

## Usage
```javascript
import { cache,define } from 'appolo';

@define()
export class SomeClass {
    private counter = 0;

    @cache()
    method() {
       return ++this.counter
    }

    @cache({interval:5000}) // will be refreshed every 5 sec
    async method2(key:string) {
        let result = await doSomeThingAsync(key)
        return result;
    }
}

let someClass = new SomeClass();
someClass.method() // 1
someClass.method()// 1
```