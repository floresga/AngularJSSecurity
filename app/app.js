"use strict";
angular.module('myApp', ['ngResource', 'ngCookies', 'LocalStorageModule']);

angular.module('myApp').factory('httpRequestInterceptor', function ($rootScope, localStorageService) {
    var initValue = ' ';
    if (!angular.isUndefined(localStorageService.token)){
        console.log('MEX-003A: localStorage token: ' + localStorageService.token)
        $rootScope.token = localStorageService.get('token');
    }else{
        console.log('MEX-003B: localStorage token: ' + localStorageService.token)
    }

    if (angular.isUndefined($rootScope.token) || $rootScope == null){
        initValue = 'Basic unisysdemexico'
    }else{
        initValue = 'Basic '+$rootScope.token
    }
    console.log ('MEX-003C: initvalue: ' + $rootScope.token)
    return {
        request: function (config) {
            config.headers['Authorization'] = initValue;
            config.headers['Accept'] = 'application/json;odata=verbose';
            return config;
        }
    };
});

angular.module('myApp').config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

angular.module('myApp').run(function ($rootScope, $q, $http) {

    var defer = $q.defer();
    // get the token from the server, store it in the root scope
    $http.get('http://10.0.0.4:8088/getToken')
        .then (function (response) {
                defer.resolve(response.data);
            }.bind(this),
            function (response) {
                defer.reject({error:response.data, status:response.status});
            });

    defer.promise.then(function(data) {
        $rootScope.token = data.data.token;
        console.log('MEX-003A: data: ' + JSON.stringify(data));
        console.log('MEX-003B: $rootScope.token: ' + $rootScope.token);
    });


    $rootScope.clients = [
        {
            "name": "Melissa Schroeder",
            "isActive": true,
            "phone": "+1 (924) 506-2978"
        },
        {
            "name": "Harding Holden",
            "isActive": false,
            "phone": "+1 (989) 418-2445"
        },
        {
            "name": "Warner Bowman",
            "isActive": true,
            "phone": "+1 (837) 521-3042"
        },
        {
            "name": "Castillo Kirk",
            "isActive": false,
            "phone": "+1 (822) 483-3666"
        },
        {
            "name": "Martha Chaney",
            "isActive": false,
            "phone": "+1 (940) 547-3909"
        }
    ];
});

angular.module('myApp').service('AppModel', function ($rootScope, $q, $http, $cookies, localStorageService) {

    this.states = [{name:'Jalisco', abbreviation: 'GDL'}, {name:'Sonora', abbreviation: 'SON'}];

    var defer = $q.defer();
    this.sendRequest = function () {
        $http.get('http://192.168.0.207/arequest')
            .then (function (response) {
                    defer.resolve(response);
                    console.log('MEX-004C: response:'+  JSON.stringify(response.data));
                    console.log('MEX-004D: Cookies:'+ JSON.stringify($cookies));
                    console.log('MEX-004E:   token:'+ $cookies.token);
                    if (angular.isUndefined($cookies.token)){
                        localStorageService.set('token', $rootScope.toke );
                        $cookies.token = $rootScope.token;
                        $rootScope.token = response.data.token;

                    }else{
                        localStorageService.set('token', $cookies.token );
                        $rootScope.token = $cookies.token;
                    }
                    console.log ('MEX-004F: storaged token: '+localStorageService.get('token'));
                }.bind(this),
                function (response) {
                    defer.reject({error:response.data, status:response.status});
                    console.log('MEX-004F: error:' + response.data + ', status:' + response.status);
                });
    }

});

angular.module('myApp').controller('MainController', ['AppModel', function(AppModel) {

    this.model = AppModel;

}]);


