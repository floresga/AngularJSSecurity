# AngularJS Security Considerations
_`Using a Bearer Token`_
==

### Transcript

So let's show how our application can send the bearer token that we receive from the server back to the server. So subsequent requests to the server from our application requires to send the bearer token back, which lets the server know who we are, and the server will allow us authorization. So what I have is I have a web server much like the previous example. Every GET to the web server will return back my "token". So let's see how my application would send that "token" back to the web server. I've modified the server slightly so that every time we do a GET on the server, not only do we send the "token" back, which we already saw before, but we're going to print the headers. So printing the headers will show print to standard out what headers were received by the server. So let's go and start the server over here, so we have access to it when we run our application. Now let's look at the main view. The main view shows the token as before. Now we have a button, 
The menu bar of the Mac OS desktop that contains the Apple menu and the Application menu is displayed. The Application menu includes the following menus: Sublime Text 2, File, Edit, Selection, Find, View, Goto, Tools, Project, Window, and Help. In addition, the right end of the menu bar also displays the Status menu and the icons: Spotlight and Notification Center.

The server.py – advancedangularjssites window is open in the Sublime Text 2 editor.

The left pane of the window contains nodes such as app, bower_components, dist, and webserver.

The webserver node is expanded by default and includes the server.py subnode that is selected by default.

The right pane of the window contains the following tabs: server.py, main.js, and main.html. The server.py tabbed page is open by default and includes the following partially displayed code in the code editor area:
```
1  #!/usr/bin/python
2 import BaseHTTPServer
3 from pprint import pprint
4
5 HOST_NAME = 'localhost'
6 PORT_NUMBER = 8000
7
8 class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
9 def do_HEAD(self):
10 self.send_response(200)
11 self.send_header("Content-type", "text/html")
12 self.end_headers()
13 def do_GET(self):
14 print self.headers
15 self.send_response(200)
16 self.send_header("Content-type", "application/json")
17 self.send_header("Access-Control-Allow-Origin", "*");
18 self.send_header("Access-Control-Expose-Headers", "Access-Control-All
19 self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested
20 self.end_headers()
21 self.wfile.write('{ "data" : { "token": "A1B2C3D4E5F6" } }')
22 def do_POST(self):
23 self.send_response(200)
24 self.send_header("Content-type", "application/json")
25 self.send_header("Access-Control-Allow-Origin", "*");
26 self.send_header("Access-Control-Expose-Headers", "Access-Control-All
27 self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested
28 self.end_headers()
29 def do_OPTIONS(self):
30 self.send_response(200)
31 self.send_header("Content-type", "application/json")
```
The presenter highlights explains the following code statement in line #21:
```
self.wfile.write('{ "data" : { "token": "A1B2C3D4E5F6" } }')
```
He also highlights and explains the following code statements:
```
13 def do_GET(self):
14 print self.headers
```
He then navigates to 3. Thanks for flying Vim (bash) file in the iTerm window and runs the following command at the $ command prompt:
```
clear
```
He then runs the following command at the $ command prompt:
```
python server.py
```
Next he navigates to the server.py tabbed page in the Sublime Text 2 editor and then navigates to the Google Chrome browser window. The browser window displays the tabbed page localhost:9000/#/ with the address localhost:9000/#/. The tabbed page displays the following text in the left pane:
```
Advanced AngularJS
Welcome to Advanced AngularJS!
My token is: A1B2C3D4E5F6.
```
It also includes the Send Request button. The right pane of the tabbed page contains the DevTools window with the Object {data: Object} node and the text main.js:16 beside it. 

 let's see what that button shows. So the button has an onclick, an ng-click="sendRequest()". So when we click the button, we're going to execute the "sendRequest()" method, which is defined in main.js right here. So the first part of the code requests the token from the server, logs it out, assigns it to the $rootScope. And that's done when we load the page in, so we'll load that. Notice we see to the server, this is the header right here. So these are all the headers that the server received on the first request. And we're looking at what the result came...that came back including the token. And we store that token on the $rootScope here. Then when we click that button, we'll do a console.log("Sending bearer token"); and here's how the bearer token is sent to the server. We're going to assign to $http.defaults.headers.common. And these are the common headers, the Authorization header, 'Bearer ' followed by the token that we're sending back. 
The localhost:9000/#/ tabbed page is displayed in the Google Chrome browser window.

The presenter navigates to the main.html tabbed page in the Sublime Text 2 editor.

The tabbed page contains the following code:
```
1 <div class="row">
2 <h4>Advanced AngularJS</h4>
3 <p>
4 Welcome to Advanced AngularJS!
5 </p>
6
7 <p>My token is: <span ng-bind="token"></span>.</p>
8 <button class="btn btn-primary" ng-click="sendRequest()">Send Request</button>
9 </div>
10
```
The presenter explains the following code statement in line #8:
```
<button class="btn btn-primary" ng-click="sendRequest()">Send Request</button>
```
Next he navigates to main.js tabbed page which contains the following partially displayed code:
```
1 'use strict';
2
3 /**
4 * @ngdoc function
5 * @name classProjectApp.controller:MainCtrl
6 * @description
7 * # MainCtrl
8 * Controller of the classProjectApp
9 */
10 angular.module('classProjectApp')
11 .controller('MainCtrl', function ($rootScope, $scope, $http) {
12
13 // get the token from the server, store it in the root scope
14 $http.get('http://localhost:8000/getToken').
15 success(function(result, status, headers, config) {
16 console.log(result);
17 $rootScope.token = result.data.token;
18 });
19
20 $scope.sendRequest = function () {
21 console.log("Sending bearer token");
22
23 $http.defaults.headers.common.Authorization = 'Bearer' + $rootScope.token;
24
25 $http.get('http://localhost:8000/arequest').
26 success(function(result, status, headers, config) {
27 console.log(result);
28 });
29 }
30
31 });
```
He then refers to the following lines of code:
```
20 $scope.sendRequest = function () {
21 console.log("Sending bearer token");
22
23 $http.defaults.headers.common.Authorization = 'Bearer' + $rootScope.token;
24
25 $http.get('http://localhost:8000/arequest').
26 success(function(result, status, headers, config) {
27 console.log(result);
28 });
29 }
```
Next he explains the following lines of code:
```
14 $http.get('http://localhost:8000/getToken').
15 success(function(result, status, headers, config) {
16 console.log(result);
17 $rootScope.token = result.data.token;
```
Then he navigates to the localhost:9000/#/ tabbed page in the browser window and reloads the page. Then he navigates to the iTerm window which now displays the following codes that he refers to as headers:
```
Host: localhost:8000
Connection: keep_alive
Accept: application/json, text/plain, */*
Origin: http://localhost:9000
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.3
6 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36
Referer: http://localhost:9000/
Accept-Encoding: gzip, deflate, sdch
Accept-Language: en-US, en; q=0.8
127.0.0.1 - - [24/Jun/2015 10:52:56] "GET /getToken HTTP/1.1" 200 -
```
Next he navigates to the localhost:9000/#/ tabbed page in the browser window and points to the DevTools window in the right pane. He then expands the Object {data: Object} node and the following subnodes are displayed: data: Object and _proto_: Object. Then he expands the data: Object subnode and the following subnodes token: "A1B2C3D4E5F6" and _proto_: Object, are displayed. Next he highlights A1B2C3D4E5F6.

Next he navigates to the main.js tabbed page in the Sublime Text 2 editor and points to rootscope in the following code statement in line #17:
```
$rootScope.token = result.data.token;
```
He then highlights and explains the following code statements:
```
21 console.log("Sending bearer token");
22
23 $http.defaults.headers.common.Authorization = 'Bearer' + $rootScope.token; 
```
 So that assigns to the Authorization header this token. And then when we make a request to the server, it doesn't matter what the request is, it always executes the same code. It will show the header to standard out. So let me put a couple of line breaks in there. We'll come over here and hit the button, and we'll look at the headers received this time, and sure enough there's our "Bearer" token in the "Authorization" item in the header. So again when the client AngularJS program receives the "Bearer" token, it sends it back through the header, through the "Authorization" key, and we assign that by assigning $http.defaults.headers.common.Authorization some string, and notice that string includes the token that's stored on the $rootScope. 
The main.js tabbed page in the Sublime Text 2 editor is displayed. The presenter explains the following code:
```
23 $http.defaults.headers.common.Authorization = 'Bearer' + $rootScope.token;
24
25 $http.get('http://localhost:8000/arequest').
```
He then navigates to the iTerm window, presses the Enter key and inserts line breaks. Next he navigates to the localhost:9000/#/ tabbed page in the browser window.

He then clicks the Send Request button as a result of which, the DevTools window pane in the right pane of the tabbed page gets populated.

He then navigates back to the iTerm window and points to the following codes now displayed that he refers to as headers:
```
127.0.0.1 - - [24/Jun/2015 10:54:00] "OPTIONS /arequest HTTP/1.1" 200 -
Host: localhost:8000
Connection: keep-alive
Accept: application/json, text/plain, */*
Origin: http://localhost:9000
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.3
6 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36
Authorization: Bearer A1B2C3D4E5F6
Referer: http://localhost:9000/
Accept-Encoding: gzip, deflate, sdch
Accept-Language: en-US ,en; q=0.8

127.0.0.1 - - [24/Jun/2015 10:54:00] "GET /arequest HTTP/1.1" 200 -
```
Then he points to the following line of code:
```
Authorization: Bearer A1B2C3D4E5F6
```
He then navigates back to the main.js tabbed page in the Sublime Text 2 editor and explains the following code statement in line #23:
```
$http.defaults.headers.common.Authorization = 'Bearer' + $rootScope.token; 
```

### app.js
```javascript
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
```


### index.html
```html
<html ng-app="myApp">
<head>
    <title>using_services_to_GET_data</title>

    <script type="text/javascript" src="./bower_components/angular/angular.js"></script>
    <script type="text/javascript" src="./bower_components/angular-resource/angular-resource.js"></script>
    <script type="text/javascript" src="./bower_components/angular-route/angular-route.js"></script>
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