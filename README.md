angular-cordova-device-orientation
==================================

Bring Apache Cordova Orientation API to AngularJS Mobile Apps...

Define a simple service to deal with Cordova Orientation Plugin (https://github.com/apache/cordova-plugin-device-orientation).

[![Build Status](https://travis-ci.org/xelita/angular-cordova-device-orientation.png?branch=master)](https://travis-ci.org/xelita/angular-cordova-device-orientation)

Usage
-----
Include cordovaDeviceOrientationModule.js in your Cordova application.

```html
<script src="js/cordovaDeviceOrientationModule.js"></script>
```

or use the minified version:

```html
<script src="js/cordovaDeviceOrientationModule.min.js"></script>
```

Add the module `cordovaDeviceOrientationModule` as a dependency to your app module:

```js
var myapp = angular.module('myapp', ['cordovaDeviceOrientationModule']);
```

Use the cordovaDeviceOrientationService as controller dependency and call cordovaDeviceOrientationService API:

```js
$scope.getCurrentHeading = function() {
    cordovaDeviceOrientationService.getCurrentHeading(function(heading){
        alert('Heading: ' + heading.magneticHeading);
    });
};
```

Sample
------
A sample based on Ionic Framework can be found here:
https://github.com/xelita/angular-cordova-plugins-sample
