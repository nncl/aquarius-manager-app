/**
 * @description
 * Aquarius app module and stuff.
 */

var app = angular.module('aquariusApp', [
    'ionic',
    'rzModule'
]);

app.constant('SETTINGS', {
    "FIREBASE_URL": "https://mobmaisincrivels2.firebaseio.com/"
});

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.controller('AppCtrl', function ($scope) {

    // settings
    var vm = this;

    vm.phSlider = {
        minValue: 1,
        maxValue: 4,
        currentValue: 14,
        options: {
            ceil: 14,
            step: 1,
            onChange: function (p1, minValue, maxValue) {
                console.log(minValue, maxValue);
            }
        }
    };

    vm.tempSlider = {
        minValue: 10,
        maxValue: 20,
        currentValue: 32,
        options: {
            ceil: 50,
            step: 1,
            onChange: function (p1, minValue, maxValue) {
                console.log(minValue, maxValue);
            }
        }
    };

    // methods
    // TODO
});