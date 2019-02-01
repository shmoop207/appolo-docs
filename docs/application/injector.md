---
id: injector
title: Injector
sidebar_label: Injector
---

 `injector` holds application context it can be injected to any class
```javascript
@define()
export class FooManager{
    @inject() injector:Injector

    doSomeThing(){
        this.injector.get("someObject")
    }
}
```

## Usage

### `get<T>(objectID: string | Function, runtimeArgs?: any[]): T`
return object instance by id or class type if the instance not found error is throw<br>
if the object is not singleton run time args can be passed to object instance
```javascript
let instance = injector.get("someId")
```
### `resolve<T>(objectID: string | Function, runtimeArgs?: any[]): T`
same as `get` but if the instance not found `null` is returned

### `getInstance<T>(id: string): T`
get singleton instance by id if not found `null` is returned

### `hasInstance(id: string): boolean`
return true if singleton instance exists

### `addInstance(instanceId: string, instance: any): Injector`
add instance by instance id

```javascript
 injector.addInstance("someId",{"some":"thing"})
```

### `removeInstance(objectId: string): Injector`
remove instance by id

### `getObjectsByType<T>(type: Function): T[]`
return array of matched objects by type
### `getInstances(): { [id: string]: { [index: string]: any } }`
get all instances index by id
### `getDefinitions(): { [id: string]: IDefinition }`
get all definitions index by id
### `getDefinitionsValue(): IDefinition[]`
get all definitions array
### getTypes(): Function[]
get all Classes
### `hasDefinition(id: string): boolean`
return true if definition exists
### `getDefinition(id: string): IDefinition`
get definition by id
### `addAlias(aliasName: string, value: any)`
add alias by alias name
### `removeAlias(aliasName: string, value: any)`
remove alias by name and value
### `getAlias(aliasName: string): any[]`
get all instances by alias name
### `addAliasFactory(aliasName: string, value: any)`
add alias by alias name
### `removeAliasFactory(aliasName: string, value: any)`
remove alias by name and value
### `getAliasFactory(aliasName: string): any[]`
get all instances by alias name
### `getFactoryMethod(objectId: string | Function)`
return factory create method by id
### `register(id: string | Class, type?: Class, filePath?: string): Define`
register new definition
```javascript
class SomeClass{
    initialize(){}
}

injector.register('someClass', SomeClass)
    .singleton()
    .initMethod('initialize')
    .inject("someOtherClass")
    .alias("someName")
```