# Express API 02

This is to help me understand how to manage the backend files with JavaScript Express.

- Builds off Express API 01
- adds recieving .jpeg files

## Installation

1. clone
2. yarn install
3. add a .env file

## Test at

domain: "expressapi02.dashanddata.com/areWeRunning"

## for receving images use express-fileupload

1. install `yarn add express-fileupload`
2. app.js

```js
const fileUpload = require("express-fileupload");
app.use(fileUpload());
```
