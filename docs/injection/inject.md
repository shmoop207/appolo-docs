---
id: inject
title: Inject
sidebar_label: Inject
---

`@inject` will try to inject object id to the same property name.
```javascript
@define()
@singleton()
class FooManager{
    get name () { return 'foo' }
}
@define()
@singleton()
class BarManager{
    get name () { return 'bar' }
}

@define()
class BuzzController{
    @inject() fooManager:FooManager;
    @inject() barManager:BarManager;

    get name () { return this.fooManager.name + this.barManager.name }
}

var buzzController = injector.get<BuzzController>(BuzzController);
console.log(buzzController.name) // foobar
```

## Inject Instance By Name
you can set the name of the property the object will be injected to.
```javascript
@define()
@singleton()
class FooManager{
    get name() {return 'foo'}
}
@define()
@singleton()
class BarManager{
    get name() { return 'bar'}
}
@deine()
class BuzzController{
    @inject(FooManager) foo:FooManager;
    @inject('barManager') bar:BarManager;

    get name () { return this.foo.name + this.bar.name}
 }

var buzzController = injector.get('buzzController');
console.log(buzzController.name) // foobar
```

## Inject Property Value
```javascript
@define()
class FooManager{
    @injectValue('foo') name:string
    get name () {return this.name;}
 }

@define()
class BuzzController{
    @inject(FooManager) foo:FooManager;

    get name () { return this.foo.name}
}

let buzzController = injector.get('buzzController');
console.log(buzzController.name()) // foo
```

## Inject Method Param
you can inject instance to method param to any function.
```javascript
@define()
class FooManager{
    get name () {return "foo"}
}

@define()
class BuzzController{
    public name (@injectParam(FooManager) foo:FooManager) {
        return this.foo.name
    }
}

let buzzController = injector.get('buzzController');
console.log(buzzController.name()) // foo
```

## Inject Factory Method
factory method is a function that will return the injected object.
this is useful the create many instances of the same class.
```javascript
@define()
class  Person{
    constructor (name) {
        this.name = name;
    }
    get name(){return this.name; }
}
@define()
class FooController{
    @injectFactoryMethod(Person) createPerson:(name)=>Person
    name () { return this.createPerson('foo').name; }
}

var buzzController = injector.getObject('fooController');
console.log(fooController.name) // foo
```

## Inject Property Array
you can inject array of properties by reference or by value.

```javascript
@define()
@singleton()
class FooManager{
    get name () { return 'foo' }
 }

@define()
@singleton()
class BarManager{
    get name () {return 'bar'}
}
@define()
class BuzzController{
    @injectArray([FooManager,BarManager]) objects:any[]

    name () { this.objects.map(obj=>obj.name).join() }
}

var buzzController = injector.getObject('buzzController');
buzzController.name // foobar

```

## Inject Property Dictionary
you can inject dictionary of properties by reference or by value.

```javascript
@define()
@singleton()
class FooManager{
	get name () { return 'foo' }
 }

@define()
@singleton()
class BarManager{
	get name () {return 'bar'}
}
@define()
class BuzzController{
    @injectDictionary({foo:FooManager,bar:BarManager}) objects:any[]
    get name () {return this.objects.foo.name + this.objects.bar.name + this.objects.baz;}
}

var buzzController = injector.getObject('buzzController');
buzzController.name // foobarbaz

```
## Inject Property From Object Property
you can inject property from other object property.
```javascript
@define()
@singleton()
class FooManager{
	public name =  'foo';
}
@define()
class BuzzController{
    @injectObjectProperty(FooManager,'name') otherObjectProperty

    name () {return return this.otherObjectProperty;}
}

let buzzController = injector.getObject('buzzController');
buzzController.name() // foo
```
