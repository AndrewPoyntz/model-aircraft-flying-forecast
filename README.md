# Model Aircraft Flying Forecast (MAFF)

This is a project created as part of a pre-interview task for the job of "Creative front end developer" at the Met Office

Written in AngularJS, as it allows for future expansion such as more locations and using the real data feeds.

[Live demo](http://andrewpoyntz.co.uk/maff/app/)


I have included all of the NPM libraries needed & their dependencies, to ensure you have everything, however, running NPM install in the root folder would also have download all of the dependencies.

I didn't have enough time to unit test the entire application & get in all the functionality I wanted to, so I have created some unit tests for the forecast controller & utils factory to show how I'd usually approach it.

Libraries used in the app:

NPM

* [AngularJs](https://angularjs.org/)
* [angular-animate](https://docs.angularjs.org/api/ngAnimate) - for creating jquery like transitions, with more time, I could have done a lot more on the UI with this
* [angular-aria](https://docs.angularjs.org/api/ngAria) - get some accessibility improvements for 'free'
* [angular-cookies](https://docs.angularjs.org/api/ngCookies) - used for saving/updating/getting preferences
* [Sugar Js](http://sugarjs.com/) - awesome date handling & other goodies!

non-NPM 

* [x2js](https://code.google.com/p/x2js/)

NPM libraries For development:

* [gulp](http://gulpjs.com/) - task runner
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) - compile .scss files into CSS on the fly
* [browser-sync](http://www.browsersync.io/) - combined with gulp & sass for live browser update while styling the UI & cross device testing
* [karma](https://www.npmjs.com/package/karma), [jasmine](http://jasmine.github.io/), [angular-mocks](https://github.com/angular/bower-angular-mocks), [phantomJs](http://phantomjs.org/), [karma-phantomjs-launcher](https://github.com/karma-runner/karma-phantomjs-launcher) - for writing/running unit tests
  