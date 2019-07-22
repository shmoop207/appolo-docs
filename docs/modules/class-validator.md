---
id: class-validator
title: ClassValidator
sidebar_label: ClassValidator
---

validate any method or argument using [class-validator](https://github.com/typestack/class-validator ) and [class-transformer](https://github.com/typestack/class-transformer)


## Installation
```typescript
npm i @appolo/validator
```

## Options

| key | Description | Type | Default
| --- | --- | --- | --- |
| `validatorOptions` | class validator [options](https://github.com/typestack/class-validator#passing-options) | `object`|  `{whitelist:true}`|
| `transformOptions` |  class transformer [options](https://github.com/typestack/class-transformer) | `object` | `{enableImplicitConversion:true}` |
| `validationErrorFormat` | validation error formatter function | `function` | `(results: ValidationError[]) => results.toString()` |

in config/modules/all.ts

```typescript
import {App} from 'appolo';
import {ValidationModule} from '@appolo/validator';

export = async function (app:App) {
    await app.module(new ValidationModule());
}
```
## Validate
### Validate method

if valid the query object will be converted to given model
```typescript
import {controller,inject,Controller,query,get} from 'appolo';
import {validate,IsString} from '@appolo/validation';

class SomeModel {
  @IsString()  
  name:string
}

@controller()
export class TestController extends Controller{
    @inject() dataManager:DataManager;

    @get("/search/")
    @validate()
    public async search (@query() query:SomeModel) {
        return await this.dataManager.search(query.name)
    }
}
```
### Validate argument
```typescript
import {define,inject,Controller,query,get} from 'appolo';
import {validate,IsString} from '@appolo/validation';

@define()
export class TestController extends Controller{
    @inject() dataManager:DataManager
    
    @get("/search/")
    public async search (@validate() @query() query:SomeModel) {
        return await this.dataManager.search(query.name)
    }
}
```

### Validate custom model
```typescript
import {define,inject} from 'appolo';
import {validate} from '@appolo/validation';

@define()
export class SomeManager{
    public async search (@validate(SomeModel) model:any) {
        // do something
    }
}
```

### Validate with options
```typescript
import {define} from 'appolo';
import {validate} from '@appolo/validation';

@define()
export class SomeManager{
    public async search (@validate(SomeModel,{groups:["someGroup"]}) model:any) {
        // do something
    }
}
```

### Validation Error
   If validation fails `BadRequestError` will be thrown
   - message will be formatted using `validationErrorFormat` options
   - data  - array of `ValidationError`
   
   ```typescript
   [{
       target: Object,
       property: "title",
       value: "Hello",
       constraints: {
           length: "$property must be longer than or equal to 10 characters"
       }
   }]
   ```

### Custom Validator
you can define custom validator using appolo injector

```typescript
import {registerDecorator,ValidationArguments,ValidationOptions,ValidatorConstraint,ValidatorConstraintInterface} from "class-validator";
import {define,inject} from 'appolo';

@define()
@ValidatorConstraint({async: true})
export class IsValidUserNameConstraint implements ValidatorConstraintInterface {
    
    @inject() userRepository:UserRepository;
    
    async validate(value: any, args: ValidationArguments) {
        let user = await this.userRepository.findOneByName(value)
            
        return !!user
    }
}

export function IsValidUserName(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidUserNameConstraint
        });
    };
}
```

## Transform
Transform Argument to given model
```typescript
import {controller,inject} from 'appolo';
import {transform,IsString} from '@appolo/validation';

class SomeModel {
  @IsString()  
  name:string
}

@define()
export class SomeManager{
    public async search (@transform(SomeModel) model:any) {
        // do something
    }
}
```

## Transform After
Transform the return value to given model
```typescript
import {controller,inject} from 'appolo';
import {transform,IsString,transformAfter} from '@appolo/validation';

class SomeModel {
  @IsString()  
  name:string
}

@define()
export class SomeManager{
    @transformAfter(SomeModel)
    public async search (model:any) {
        return model;
    }
}
```
