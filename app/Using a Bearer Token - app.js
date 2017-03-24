"use strict";
angular.module('myApp', ['ngResource']);

angular.module('myApp').factory('httpRequestInterceptor', function ($rootScope) {
    var initValue = ' ';
    if (angular.isUndefined($rootScope.token) || $rootScope == null){
        initValue = 'Basic unisysdemexico'
    }else{
        initValue = 'Basic '+$rootScope.token
    }
    console.log ('MEX-003A: initvalue: ' + $rootScope.token)
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
    $http.get('http://192.168.0.207/getToken')
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

angular.module('myApp').service('AppModel', function ($rootScope, $q, $http) {

    this.states = [{name:'Jalisco', abbreviation: 'GDL'}, {name:'Sonora', abbreviation: 'SON'}];

    var defer = $q.defer();
    this.sendRequest = function () {
        $http.get('http://192.168.0.207/arequest')
            .then (function (response) {
                    defer.resolve(response);
                    console.log('MEX-004C: response:'+  JSON.stringify(response.data));
                }.bind(this),
                function (response) {
                    defer.reject({error:response.data, status:response.status});
                    console.log('MEX-004D: error:' + response.data + ', status:' + response.status);
                });
    }

});

angular.module('myApp').controller('MainController', ['AppModel', function(AppModel) {

    this.model = AppModel;

}]);


