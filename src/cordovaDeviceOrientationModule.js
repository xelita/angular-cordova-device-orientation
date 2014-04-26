/**
 * Angular Module relying on Apache Cordova Device Orientation Plugin (cordova plugin add org.apache.cordova.device-orientation).
 */
var cordovaDeviceOrientationModule = angular.module('cordovaDeviceOrientationModule', []);

// Constants

/**
 * Constants service used in the whole module.
 */
cordovaDeviceOrientationModule.constant('cordovaDeviceOrientationConstants', {
    apiVersion: '1.0.0',
    cordovaVersion: '>=3.4.0'
});

// Services

/**
 * Main service relying on Apache Cordova Device Orientation Plugin.
 */
cordovaDeviceOrientationModule.factory('cordovaDeviceOrientationService', ['$rootScope', '$log', 'cordovaDeviceOrientationConstants', function ($rootScope, $log, cordovaDeviceOrientationConstants) {
    return {
        /**
         * Return the current API version.
         */
        apiVersion: function () {
            $log.debug('cordovaDeviceOrientationService.apiVersion.');
            return cordovaDeviceOrientationConstants.apiVersion;
        },

        /**
         * Return the cordova API version.
         */
        cordovaVersion: function () {
            $log.debug('cordovaDeviceOrientationService.cordovaVersion.');
            return cordovaDeviceOrientationConstants.cordovaVersion;
        },

        /**
         * Check the DeviceOrientation plugin availability.
         * @returns {boolean}
         */
        checkDeviceOrientationAvailability: function () {
            $log.debug('cordovaDeviceOrientationService.checkDeviceOrientationAvailability.');
            if (!navigator.compass) {
                $log.warn('DeviceOrientation API is not available.');
                return false;
            }
            return true;
        },

        /**
         * Get the current compass heading.
         * For more information: https://github.com/apache/cordova-plugin-device-orientation/blob/dev/doc/index.md#navigatorcompassgetcurrentheading
         */
        getCurrentHeading: function (successCallback, errorCallback) {
            $log.debug('cordovaDeviceOrientationService.getCurrentHeading.');

            // Checking API availability
            if (!this.checkDeviceOrientationAvailability()) {
                return;
            }

            // API call
            navigator.compass.getCurrentHeading(
                function (heading) {
                    $rootScope.$apply(successCallback(heading));
                },
                function (error) {
                    $rootScope.$apply(errorCallback(error));
                }
            );
        },

        /**
         * Gets the device's current heading at a regular interval. Each time the heading is retrieved, the headingSuccess callback function is executed.
         * For more information: https://github.com/apache/cordova-plugin-device-orientation/blob/dev/doc/index.md#navigatorcompasswatchheading
         */
        watchHeading: function (successCallback, errorCallback, options) {
            $log.debug('cordovaDeviceOrientationService.watchHeading.');

            // Checking API availability
            if (!this.checkDeviceOrientationAvailability()) {
                return null;
            }

            // API call
            return navigator.compass.watchHeading(
                function (heading) {
                    $rootScope.$apply(successCallback(heading));
                },
                function (error) {
                    $rootScope.$apply(errorCallback(error));
                },
                options
            );
        },

        /**
         * Stop watching the compass referenced by the watch ID parameter.
         * For more information: https://github.com/apache/cordova-plugin-device-orientation/blob/dev/doc/index.md#navigatorcompassclearwatch
         */
        clearWatch: function (watchID) {
            $log.debug('cordovaDeviceOrientationService.clearWatch.');

            // Checking API availability
            if (!this.checkDeviceOrientationAvailability()) {
                return;
            }

            // API call
            navigator.compass.clearWatch(watchID);
        }
    };
}]);