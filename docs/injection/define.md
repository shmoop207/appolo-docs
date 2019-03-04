---
id: define
title: Define
sidebar_label: Define
---
Use the define decorator to register the class in the injector.

The class must be exported.

```typescript
@define()
export class FooController{ }
```
or with custom Id
```typescript
@define("someId")
export class FooController2{ }
```

get the controller instance from the injector

```typescript
let fooController = injector.get('fooController');
let fooController2 = injector.get(FooController);
let someController = injector.get('someId');
```