/**
 * @description
 * Aquarius app module and stuff.
 */

var app = angular.module('aquariusApp', [
    'ionic',
    'firebase',
    'ionic-notification-bar',
    'rzModule'
]);

app.constant('SETTINGS', {
    "FIREBASE_URL": "https://mobmaisincrivels2.firebaseio.com/",
    "FIREBASE_CHILD": "-KtEei-K13DSQCJfSJKd"
});

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })

        .state('tab.ph', {
            url: '/ph',
            views: {
                'tab-ph': {
                    templateUrl: 'templates/tab-ph.html'
                }
            }
        })

        .state('tab.temperature', {
            url: '/temperatura',
            views: {
                'tab-temperature': {
                    templateUrl: 'templates/tab-temperature.html'
                }
            }
        })

        .state('tab.about', {
            url: '/sobre',
            views: {
                'tab-about': {
                    templateUrl: 'templates/tab-about.html'
                }
            }
        })

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/ph');

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
                                    $firebaseObject,
                                    $notificationBar,
                                    SETTINGS) {

    // settings
    var vm = this,
        ref = firebase.database().ref().child(SETTINGS.FIREBASE_CHILD);

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
                vm.fireData.ph_inicial = minValue;
                vm.fireData.ph_final = maxValue;
                vm.fireData.$save();

                $notificationBar.show('Atualizado com sucesso!!', $notificationBar.SUCCESS);
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
                vm.fireData.temp_inicial = minValue;
                vm.fireData.temp_final = maxValue;
                vm.fireData.$save();
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

    vm.doSave = function () {
        vm.fireData.ph_inicial = 99;

        vm.fireData.$save();
    };
});