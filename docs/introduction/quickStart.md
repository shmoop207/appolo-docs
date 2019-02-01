---
id: quickStart
title: Quick Start
sidebar_label: Quick Start
---

## Installation

```javascript
npm install appolo --save
```
## Typescript
`appolo` requires TypeScript compiler version > 2.1 and the following settings in `tsconfig.json`

```javascript
{
    "experimentalDecorators": true
}
```
## Launch
```javascript
var {createApp}  from 'appolo';
createApp().launch();
```