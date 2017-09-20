/**
 * @description
 * Aquarius app module and stuff.
 */

var app = angular.module('aquariusApp', [
    'ionic',
    'firebase',
    'rzModule'
]);

app.constant('SETTINGS', {
    "FIREBASE_URL": "https://mobmaisincrivels2.firebaseio.com/"
});

app.run(function ($ionicPlatform,
                  SETTINGS) {

    // Setup firebase app
    var config = {
        databaseURL: SETTINGS.FIREBASE_URL
    };
    firebase.initializeApp(config);

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

app.controller('AppCtrl', function ($scope,
                                    $firebaseObject) {

    // settings
    var vm = this,
        ref = firebase.database().ref().child('-KtEei-K13DSQCJfSJKd');

    vm.fireData = $firebaseObject(ref);
    vm.fireData.$bindTo($scope, 'data');

    vm.phSlider = {
        minValue: vm.fireData.ph_inicial,
        maxValue: vm.fireData.ph_final,
        currentValue: vm.fireData.ph_atual,
        options: {
            ceil: 14,
            step: 1,
            onChange: function (p1, minValue, maxValue) {
                console.log(minValue, maxValue);
            }
        }
    };

    vm.tempSlider = {
        minValue: vm.fireData.temp_inicial,
        maxValue: vm.fireData.temp_final,
        currentValue: vm.fireData.temp_atual,
        options: {
            ceil: 50,
            step: 1,
            onChange: function (p1, minValue, maxValue) {
                console.log(minValue, maxValue);
            }
        }
    };

    // methods
    vm.doUpdateValues = function (data) {
        vm.phSlider.minValue = data.ph_inicial;
        vm.phSlider.maxValue = data.ph_final;
        vm.phSlider.currentValue = data.ph_atual;

        vm.tempSlider.minValue = data.temp_inicial;
        vm.tempSlider.maxValue = data.temp_final;
        vm.tempSlider.currentValue = data.temp_atual;
    };

    $scope.$watch('data', function (newVal) {
        if (newVal) {
            vm.doUpdateValues(newVal);
        }
    });
});