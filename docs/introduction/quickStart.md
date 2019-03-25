---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
---

## Installation

```typescript
npm install appolo --save
```
## Typescript
`appolo` requires TypeScript compiler version > 2.1 and the following settings in `tsconfig.json`

```typescript
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "target": "es2017",
    "module": "commonjs"
  }
}
```
## Launch
```typescript
var {createApp}  from 'appolo';

createApp()
    .get("/some_path",(req,res)=> ({"working":true}))
    .launch();
```
