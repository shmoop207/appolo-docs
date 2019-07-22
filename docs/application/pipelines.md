---
id: pipeline
title: Pipelines
sidebar_label: Pipelines
---
Appolo Pipelines allows you to add custom middleware to any class method using the pipeline decorator
with pipeline you can change the the arguments passed to the origin method or change the return value 

## Usage

### Change  return value
```typescript
import {define,pipeline,IPipeline} from 'appolo';

@define()
export class SomeClass {
    
    @pipeline(PipelineTest)
    test(value:number){
        return value*value;
    }
}

@define()
export class PipelineTest implements IPipeline{

   async run(context:PipelineContext, next){
      
        let result = await next()
        
        return result*2
   }
}

injector.get<SomeClass>(SomeClass).test(2) // 8


```

### Change arguments value
```typescript
import {define,pipeline,IPipeline} from 'appolo';

@define()
export class SomeClass {
    
    @pipeline(PipelineTest)
    test(value:number){
        return value*value;
    }
}

@define()
export class PipelineTest implements IPipeline{

   async run(context:PipelineContext, next){
      
        let arg = context.getArgumentAt(0)
        
        context.setArgumentAt(arg*2);
        return next()
   }
}

injector.get<SomeClass>(SomeClass).test(2) // 16


```

### Call on single argument
```typescript
import {define,pipeline,IPipeline} from 'appolo';

@define()
export class SomeClass {
    
    
    test(@pipeline(PipelineTest) value:number,@pipeline(PipelineTest2) value2:number){
        return value*value;
    }
}
```

## Pipeline Context
pipeline must implement `IPipeline` with `run` method
the run run method will be called with pipeline `context` and `next` function
next must be called in order to continue the pipeline chain
 
### metaData
get metadata define during the pipeline decorator

```typescript
import {define,pipeline,IPipeline} from 'appolo';

@define()
export class SomeClass {
    
    @pipeline(PipelineTest,{someValue:2})
    test(value:number){
        return value*value;
    }
}

@define()
export class PipelineTest implements IPipeline{

   async run(context:PipelineContext, next){
      
        let arg = context.getArgumentAt(0)
        
        context.setArgumentAt(arg *  context.metaData.someValue);
        return next()
   }
}

```
### index
return the index number if the pipeline defined on method argument

### arguments
return `IArguments` of the origin method

### instance
return the current class instance

### type
return the class type

### action
return  string name of the method name

### argumentsTypes
return array of the arguments types
### setArgumentAt
return set argument value at index

### getArgumentAt
return  argument value at index

### values
return  array of argument values by index and type
