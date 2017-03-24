# AngularJS Security Considerations
_`Using Cookies with Bearer Tokens`_
==

### Transcript

Let's look at some code to see how we might send the token to a cookie. So we'll take the previous example and modify it slightly. The first thing we see is that I'm passing $cookies into my .controller and $cookies is a variable that we can use to access the cookies sent to us by the server and then to send a cookie back to the server. So if the server sends us a cookie, $cookies will have a value. Otherwise, it will be undefined. So let's run this code the first time and we'll see that, in fact, it is undefined. So we'll do a get to the local server, which is running already. We'll grab the result, which we'll look at later, and then we'll look at $cookies. So if $cookies has some value, then it will be returned back. Otherwise, it will be undefined. And then we check if there is a $cookies.token, then set the $rootScope.token to that $cookies.token. Otherwise, grab it from the result. And then this line here sets the $cookies, so it can be sent the next time to the server. 
The menu bar of the Mac OS desktop that contains the Apple menu and the Application menu is displayed. The Application menu includes the following menus: Sublime Text 2, File, Edit, Selection, Find, View, Goto, Tools, Project, Window, and Help. In addition, the right end of the menu bar also displays the Status menu and the icons: Spotlight and Notification Center.

The main.js ? advancedangularjssites window is open in the Sublime Text 2 editor.

The left pane of the window contains nodes such as app, bower_components, dist, and webserver.

The app node is expanded by default and includes subnodes such as bower_components, images, and scripts. The scripts subnode is expanded and contains the controllers and app.js subnodes. The controllers subnode contains the following subnodes: about.js and main.js. The main.js subnode is selected by default.

The right pane of the window contains the main.js tabbed page and the tabbed page includes the following partially displayed code in the code editor area:
```
10 angular.module( 'classProjectApp')
11 .controller('MainCtrl', function ($rootScope, $scope, $http, $cookies) {
12
13 // get the token from the server, store it in the root scope
14 $http.get('http://localhost:8000/getToken').
15 success(function(result, status, headers, config) {
16 console.log("Cookies:", $cookies);
17 console.log(" token:", $cookies.token);
18 if ($cookies.token) {
19 $rootScope.token = $cookies.token;
20 } else {
21 $rootScope.token = result.data.token;
22 $cookies.token = $rootScope.token;
23 }
24 });
25
26 $scope.sendRequest = function () {
27 console.log("Sending bearer token");
28
29 $http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.token;
30
31 $http.get('http://localhost:8000/arequest').
32 success(function(result, status, headers, config) {
33 console.log("Result:", result);
34 console.log("   token:", $cookies.token);
35 });
36 }
37
38 });
```
The presenter explains the code $cookies from the following code statement in line #11:
```
.controller('MainCtrl', function ($rootScope, $scope, $http, $cookies) {
```
He then highlights and explains the following code statements:
```
14 $http.get('http://localhost:8000/getToken').
15 success(function(result, status, headers, config) {
16 console.log("Cookies:", $cookies);
17 console.log(" token:", $cookies.token);
18 if ($cookies.token) {
19 $rootScope.token = $cookies.token;
20 } else {
21 $rootScope.token = result.data.token;
```
Next he points to the following code statement in line #22 as the code that sets the $cookies:
```
$cookies.token = $rootScope.token; 
```
 So let's run this the first time. So the first time we invoke this program, this application, we can see that our Cookies: Object is empty so that if we access the token, it's undefined. So what that means is we get to this point $cookies.token is undefined, so we fall into the else part assigning the $rootScope.token whatever was read back from the server, and then set our $cookies.token, the $rootScope.token. That means the next time we invoke...or the next time we visit this web site, we'll send that cookie to the server. The server will send it back to us. And that can easily be shown by just clicking reload here. So now it's reloading, my Cookies is an Object's token. And then the token...and I can see I can access the token through the Cookies now. So in Angular, $cookies is the variable that'll...one of the variables that allows us to connect to the $cookies that are sent back and forth from client to server. If $cookies.token is set, that means that our token has been set and then given as a cookie, and then we can receive it that way. So if that's the case, if $cookies.token is set, then we're going to set the $rootScope to that token, and in the second invocation, it, in fact, was. 
The main.js tabbed page is open in the Sublime Text 2 editor.  The presenter navigates to the Google Chrome browser window that includes the localhost:9000/#/ tabbed page with the address localhost:9000/#/. The tabbed page displays the following text in the left pane:
```
Advanced AngularJS
Welcome to Advanced AngularJS!
My token is: A1B2C3D4E5F6.
```
It also includes the Send Request button. The right pane of the tabbed page contains the DevTools window with the Cookies: Object {} option and the text main.js:16 beside it. It also includes the token: undefined option with the text main.js:17 beside it.

He then points to both the options Cookies: Objects {} and token: undefined.

Next he navigates to the main.js tabbed page in the Sublime Text 2 editor and explains the code $cookies.token from the following code statement in line #17:
```
console.log(" token:", $cookies.token);
```
He then highlights and explains the following code statements:
```
20 } else {
21 $rootScope.token = result.data.token;
22 $cookies.token = $rootScope.token;
```
Next he navigates to the localhost:9000/#/ tabbed page in the Google Chrome browser window and reloads the page. As a result, the DevTools window in the right pane includes the following modified options: Cookies: Object {token: "A1B2C3D4E5F6} and token: A1B2C3D4E5F6.

Next he navigates to the main.js tabbed page in the Sublime Text 2 editor and explains the code $cookies from the following code statement in line #11:
```
.controller('MainCtrl', function ($rootScope, $scope, $http, $cookies) {
```
Then he explains the code $cookies.token from the following code statement in line #17:
```
console.log(" token:", $cookies.token);
```
He further explains the following code statements:
```
18 if ($cookies.token) {
19 $rootScope.token = $cookies.token;
20 } else {
21 $rootScope.token = result.data.token;
22 $cookies.token = $rootScope.token; 
```
 Otherwise, we'll grab the result and then store that into our $cookies. So the next invocation, once again the cookie will be sent back and forth. So let's do this in request. This time we're going to be sending the 'Bearer ' token through the Authorization header. And then we will do a get and what comes back, the result should be the token again. And then let's look at $cookies.token and we'll see that we get it through the cookie as well. So I'll click Send Request. We can see the Result back from the server giving us our token, and the token is in the cookie as well. So this example shows that we can send the token back and forth through a cookie. 
The main.js tabbed page in the Sublime Text 2 editor is displayed. The presenter explains the following code:
```
18 if ($cookies.token) {
19 $rootScope.token = $cookies.token;
20 } else {
21 $rootScope.token = result.data.token;
22 $cookies.token = $rootScope.token;
```
He then explains the following code statements:
```
26 $scope.sendRequest = function () {
27 console.log("Sending bearer token");
28
29 $http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.token;
30
31 $http.get( 'http://localhost:8000/arequest').
32 success(function(result, status, headers, config) {
33 console.log("Result:", result);
34 console.log(" token:", $cookies.token);
```
Then he navigates to the localhost:9000/#/ tabbed page open in the browser window. He then clicks the Send Request button as a result of which, the DevTools window now further includes the option Sending bearer token followed by the text main.js:27, the node Result: Object {data: Object} followed by the text main.js:33, and the option token: A1B2C3D4E5F6 followed by the text main.js:34. Next he expands the Result: Object {data: Object} node and the following subnodes are displayed: data: Object and _proto_: Object. He then expands the data: Object subnode and the token: "A1B2C3D4E5F6" subnode is displayed.

Finally, he points to A1B2C3D4E5F6 from the option token: A1B2C3D4E5F6. 



### app.js
```javascript
"use strict";
angular.module('myApp', ['ngResource', 'ngCookies']);

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

angular.module('myApp').service('AppModel', function ($rootScope, $q, $http, $cookies) {

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
                        $cookies.token = $rootScope.token;
                        $rootScope.token = response.data.token;
                    }else{
                        $rootScope.token = $cookies.token;

                    }
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

```


### index.html
```html
<html ng-app="myApp">
<head>
    <title>using_services_to_GET_data</title>

    <script type="text/javascript" src="./bower_components/angular/angular.js"></script>
    <script type="text/javascript" src="./bower_components/angular-resource/angular-resource.js"></script>
    <script type="text/javascript" src="./bower_components/angular-route/angular-route.js"></script>
    <script type="text/javascript" src="./bower_components/angular-cookies/angular-cookies.js"></script>
    <script type="text/javascript" src="./app.js"></script>
    <link rel="stylesheet" href="app.css">

</head>

<body>
<div ng-controller="MainController as main">
    <p>Welcome to Advanced AngularJS!</p>
    <p>My token is: <span ng-bind="token"></span>.</p>
    <p><button ng-click="main.model.sendRequest()">Send Request</button></p>

</div>
</body>
</html>
```


### myWebServer.py
```phyton
import sys
import BaseHTTPServer
import base64
from SimpleHTTPServer import SimpleHTTPRequestHandler
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer

key="A1B2C3D4E5F6"

HandlerClass = SimpleHTTPRequestHandler
ServerClass  = BaseHTTPServer.HTTPServer
Protocol     = "HTTP/1.0"

class myHandler(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def do_GET(self):
		print self.headers
		self.send_response(200)
		self.send_header('Content-type','application/json')
		self.send_header('Access-Control-Allow-Origin','*')
		self.send_header('Access-Control-Expose-Headers', 'Access-Control-Allowed')
		self.send_header("Access-Control-Allow-Headers", "Origin, X-Custom-Header")
		self.end_headers()
		self.wfile.write('{ "data" : { "token": "A1B2C3D4E5F6" } }')
		return
	def do_HEAD(self):
		self.send.response(200)
		self.send_header("Content-type", "text/html")
		self.end_headers()
		return
	def do_POST(self):
		self.send.response(200)
		self.send_header("Content-type", "application/json")
		self.send_header("Access-Control-Allow-Origin", "*");
		self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin")
		self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested")
		self.end_headers()
		return
	def do_OPTIONS(self):
		print self.headers
		self.send.response(200)
		self.send_header("Content-type", "application/json")
		self.send_header("Access-Control-Allow-Origin", "*");
		self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin")
		return

class AuthHandler(BaseHTTPRequestHandler):
	''' Main class to present webpages and authentication. '''
	def do_HEAD(self):
		print "do_HEAD"
		print self.headers
		self.send_response(200)
		self.send_header('Content-type','application/json')
		self.send_header('Access-Control-Allow-Origin','*')
		self.send_header('Access-Control-Expose-Headers', 'Access-Control-Allowed')
		self.send_header("Access-Control-Allow-Headers", "Origin, X-Custom-Header")
		self.end_headers()

	def do_OPTIONS(self):
		print "do_OPTIONS"
		print self.path
		if self.path in ('/getToken','/arequest' ):
			print "MEX: in self.path"
			self.send_response(200)
			self.send_header('Access-Control-Request-Headers', 'Authorization')
			self.send_header('Access-Control-Allow-Origin', '*')
			self.send_header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
			self.send_header('Access-Control-Allow-Credentials', 'false')
			self.send_header('Access-Control-Max-Age', '86400')
			self.send_header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')

		else:
			self.send_response(404)
		
		
	def do_AUTHHEAD(self):
		print "do_AUTHHEAD"
		self.send_response(401)
		self.send_header('WWW-Authenticate', 'Basic realm=\"Test\"')
		self.send_header('Content-type', 'application/json')
		self.end_headers()

	def do_GET(self):
		print self.headers	
		global key
		''' Present frontpage with user authentication. '''
		if self.headers.getheader('Authorization') == None:
			print "do_GET - None"
			'''self.do_AUTHHEAD()'''
			self.send_response(200)
			self.send_header('Content-type','application/json')
			self.send_header('Access-Control-Allow-Origin','*')
			self.send_header('Access-Control-Expose-Headers', 'Access-Control-Allowed')
			self.send_header("Access-Control-Allow-Headers", "Origin, X-Custom-Header, Authorization")
			'''BaseHTTPRequestHandler.do_GET(self)'''
			self.end_headers()
			self.wfile.write('{ "data" : { "token": "A1B2C3D4E5F6" } }')
			pass
		elif self.headers.getheader('Authorization').startswith( 'Basic' ):
			print "do_GET - Basic"
			self.send_response(200)
			self.send_header('Content-type','application/json')
			self.send_header('Access-Control-Allow-Origin','*')
			self.send_header('Access-Control-Expose-Headers', 'Access-Control-Allowed')
			self.send_header("Access-Control-Allow-Headers", "Origin, X-Custom-Header, Authorization")
			self.end_headers()
			self.wfile.write('{ "data" : { "token": "A1B2C3D4E5F6" } }')
			pass
		else:
			print "NO-TOKEN"
			print self.headers
			self.send_response(200)
			self.send_header('Content-type','application/json')
			self.send_header('Access-Control-Allow-Origin','*')
			self.send_header('Access-Control-Expose-Headers', 'Access-Control-Allowed')
			self.send_header("Access-Control-Allow-Headers", "Origin, X-Custom-Header, Authorization")
			self.end_headers()
			
			self.do_AUTHHEAD()
			self.wfile.write(self.headers.getheader('Authorization'))
			self.wfile.write('{ "data" : { "token": "A1B2C3D4E5F6", "auth": no_authenticated } }')

			pass

try:

	if sys.argv[1:]:
		port = int(sys.argv[1])
	else:
		port = 80
	server_address = ('192.168.0.207', port)

	HandlerClass.protocol_version = Protocol
	httpd = ServerClass(server_address, AuthHandler)

	sa = httpd.socket.getsockname()
	print "Serving HTTP on", sa[0], "port", sa[1], "..."
	httpd.serve_forever()
	
except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	httpd.socket.close()
```