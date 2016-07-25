## To run both server

```
# run server in advance on port 8080
npm install # installs node dependencies, runs TypesScript compiler and Gulp SASS routine
npm start # creates node server on localhost:3000 and opens default browser via browserSync, Gulp watches SASS changes as daemon
```

### Pros
* Scalable architecture with component-as-feature code decomposition
* Adaptive markup, even for tables
* Angular 2
* Typescript brings all features of ECMAScript 2015 and adds typisation
* Shadow DOM based components, isolated from
* Cacheble and cancelable asynchronous and event-based data flow via ReactJS
* Automated build via npm and Gulp

### Cons
* Angular 2 is still RC
* High entry level (TypesScript, Angular 2, RxJS, Gulp, SASS, Bootstrap)
* Overwhelming amount of node dependencies and build process
* Potential specific environment requirements when deploy on prod
* Heavy JS assets (2mb before it's cached, could be optimized)
* Lack of test coverage (partially compensated by TypesScript compiler)
