---
id: bootstrap
title: Bootstrap
sidebar_label: Bootstrap
---

Once it launched, appolo will try to find an appolo bootstrap class and call it's run method. <br/>
Only when the bootstrap is finished, the server will start. <br/>
bootstrap must implement `IBootstrap`.

```typescript
import {define,singleton,initMethod,inject,bootstrap,IBootstrap} from 'appolo';
@define()
@bootstrap()
export class Bootstrap implements IBootstrap{
    @inject() someManager1:SomeManager1
    public async run(){
        await this.someManager1.doSomeThing();
    }
}
```

