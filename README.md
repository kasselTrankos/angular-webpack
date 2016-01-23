# ANGULAR/WEBPACK/ES6/KARMA

[![Join the chat at https://gitter.im/kasselTrankos/angular-webpack-ES6-Karma](https://badges.gitter.im/kasselTrankos/angular-webpack-ES6-Karma.svg)](https://gitter.im/kasselTrankos/angular-webpack-ES6-Karma?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is a project, to combine Webpack, ES6 and Angular 1.x.
The intention us to apply modern hmr, and ES6 under my loved Angular 1.x

First :
```bash
npm i
```
For Dev, run:
```bash
npm run dev
```
By now, Redis is disabled and removed from project, because first need to run good mongodb. 
Uses Redis as session of node.
so you need to install and then do run:
```bash
redis-server
```

This create once compiled js, and then start de hmr server of webpack. But i can use other forces from webpack like:
- Inyectation and compilation with Babel , ES 6 and ES7
- Optimization of code.
- Server by express with hot-middleware
- Proxy with express

To use angular-sanitize, you must import the index, it was made for commonjs.

I've tried to use [Angular-HMR](https://github.com/yargalot/Angular-HMR), but i cant make run with ES7
so any help with HMR will be pleased and acepted.
