---
id: define
title: Define
sidebar_label: Define
---
Use the define decorator to register the class in the injector.

The class must be exported.

```javascript
@define()
export class FooController{ }
```
or with custom Id
```javascript
@define("someId")
export class FooController2{ }
```

get the controller instance from the injector

```javascript
let fooController = injector.get('fooController');
let fooController2 = injector.get(FooController);
let someController = injector.get('someId');
```