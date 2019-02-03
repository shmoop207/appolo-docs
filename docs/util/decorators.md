---
id: decorators
title: Decorators
sidebar_label: Decorators
---

Some useful decorators you can use on any method

## Delay
delay call method by given time in milliseconds
```javascript
import { delay } from 'appolo';

class SomeClass {
    @delay(1000)
    method() {
    // ...
    }
}
```
## Bind
bind method to class instance
```javascript
import { bind } from 'appolo-decorators';

class SomeClass {
    @bind
    method() {
    // ...
    }
}

document.body.addEventListener('click', new SomeClass().method);
```
## Debounce
debounce method using lodash debounce
```javascript
import { debounce } from 'appolo';

class SomeClass {
    @debounce(1000,{trailing:true})
    method() {
    // ...
    }
}
```
## Throttle
throttle method using lodash debounce
```javascript
import { throttle } from 'appolo';

class SomeClass {
    @throttle(1000,{trailing:true})
    method() {
    // ...
    }
}
```
## Memoize
memoize method using lodash debounce
```javascript
import { memoize } from 'appolo';

class SomeClass {
    @memoize()
    method() {
    // ...
    }
}
```
## Once
method will be called max n times and return last call result
```javascript
import { once } from 'appolo';

class SomeClass {
    @once(2)
    method() {
    // ...
    }
}
```
## Interval
setInterval to method once called
```javascript
import { interval } from 'appolo';

class SomeClass {
    @interval(100)
    method() {
    // ...
    }
}
//start the interval
new SomeClass().method()
```