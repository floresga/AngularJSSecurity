# AngularJS Security Considerations
_`Getting a Bearer Token`_
==

### Transcript

In this section, we're going to talk about how to get a bearer token and once we have the bearer token and receive it from the server, store it on the root scope. So the first step is we have to get a bearer token from somewhere. And as an example, I've written a very simple Python webserver here, and this is a very simple webserver that will run on my local host. And the main part of the webserver that I want to focus on is this do_GET function because the do_GET is what's going to be called when someone does a GET on the server. And so it'll send an "Everything's ok" response. It will set the header as json, "application/json" format. These three headers are necessary to kind of get around the cross-site scripting error that I would get. And then the GET will always write this JSON to the user. Now this GET will be called, no matter what URL is requested on this web site, so I can actually request anything at all. In the example I have, I am requesting /getToken. So I'll go ahead and use that as the example. 
The menu bar of the Mac OS desktop that contains the Apple menu and the Application menu is displayed. The Application menu includes the following menus: Sublime Text 2, File, Edit, Selection, Find, View, Goto, Tools, Project, Window, and Help. In addition, the right end of the menu bar also displays the Status menu and the icons: Spotlight and Notification Center.

The server.py - advancedangularjssites window is open in the Sublime Text 2 editor. The left pane of the window includes nodes such as .tmp, app, and webserver. The app node is expanded by default and includes subnodes such as images, scripts, and views. The views subnode is expanded by default and includes the following subnodes: about.html and main.html. The webserver node is expanded by default and includes subnodes such as server.py, .bowerrc, and .editorconfig. The server.py subnode is selected by default and the right pane includes the tabs: main.js and server.py. The server.py tabbed page is open by default and includes the following partially displayed code:

_webserver.py_
```python
#!/usr/bin/python
import sys
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer

HandlerClass = SimpleHTTPRequestHandler
ServerClass  = BaseHTTPServer.HTTPServer
Protocol     = "HTTP/1.0"

class myHandler(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def do_GET(self):
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
	def do_POST(self):
		self.send.response(200)
		self.send_header("Content-type", "application/json")
		self.send_header("Access-Control-Allow-Origin", "*");
		self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin")
		self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested")
		self.end_headers()
	def do_OPTIONS(self):
		self.send.response(200)
		self.send_header("Content-type", "application/json")
		self.send_header("Access-Control-Allow-Origin", "*");
		self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin")		
try:

	if sys.argv[1:]:
		port = int(sys.argv[1])
	else:
		port = 80
	server_address = ('192.168.0.207', port)

	HandlerClass.protocol_version = Protocol
	httpd = ServerClass(server_address, myHandler)

	sa = httpd.socket.getsockname()
	print "Serving HTTP on", sa[0], "port", sa[1], "..."
	httpd.serve_forever()
	
except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	httpd.socket.close()
```

The presenter highlights and explains the following code statements:
```phyton
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type','application/json')
		self.send_header('Access-Control-Allow-Origin','*')
		self.send_header('Access-Control-Expose-Headers', 'Access-Control-Allowed')
		self.send_header("Access-Control-Allow-Headers", "Origin, X-Custom-Header")
		self.end_headers()
		self.wfile.write('{ "data" : { "token": "A1B2C3D4E5F6" } }')
		return
```
But this is a very simple Python program, so let me go ahead and start this program. I'll just type python server.py. Then I'll go to my browser, and I'll go to localhost:8000/getToken, like so. And it returns back that JSON that I'm sending. Now the "token" that it's sending is "A1B2C3D4E5F6". So it's just a basic character string that is sent from the server to the client. Now obviously, there will be a lot of work involved in generating this "token" for the client. So for instance, the client may have to log in or in some way send credentials. But once the server, the client, the browser sends those credentials either through login or some other way, the server will respond back with this "token". So I'm just going to kind of simplify that whole process and just return the "token" from the server. That's all it is. So notice the URL is localhost:8000/getToken. 
The Sublime Text 2 editor is displayed with the server.py tabbed page open . The presenter opens the 3. Thanks for flying Vim (bash) file in the iTerm window and runs the following command at the $ command prompt:
```
python server.py
```
He then navigates to the localhost:9000/#/tabbed page in the Google Chrome browser window. The tabbed page includes the following information:

Advanced AngularJS
Welcome to Advanced AngularJS!
My token is:.

He opens a new tab and enters the following address in the address bar: localhost:8000/getToken

Then he presses the Enter key and the tabbed page displays the following information:

{ "data" : { "token": "A1B2C3D4E5F6" } } 

So let's look at the code within our application that does that work, that's right here. So in my 'MainCtrl', I'm injecting the $rootScope variable and the $http variable. So I'll take my $http and execute a get, and here is the URL that I just showed, 'http://localhost:8000/getToken'. It goes off, makes a request to that server. If that server is successful, which it should be, then result contains whatever comes back from the server. I can also look at the status, the headers, and the config if I want to, but I'm really interested in the result. I'll do a console.log of that result, and then take result.data.token, which is the token string, AB, A1B2, etc., assign that to $rootScope.token. And if I want, I'll go ahead and do a console.log here, our $rootScope.token just to make sure that it actually got assigned to my $rootScope. 
The localhost:8000/getToken tabbed page is open in the Google Chrome browser window. The presenter navigates to the main.js tab in the Sublime Text 2 editor. The tabbed page includes the following code:
```
1 'use strict';
2
3 /**
4 * @ngdoc function
5 * @name classProjectApp.contoller:MainCtrl
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
20 });
21
```
He highlights the codes $rootScope and $http from the following code statement on line #11:

.controller('MainCtrl', function ($rootScope, $scope, $http) {

He then highlights and explains the following code statements:
```
14 $http.get('http://localhost:8000/getToken').
15 success(function(result, status, headers, config) {
16 console.log(result);
17 $rootScope.token = result.data.token;
```
Then he enters the following code below the code statement $rootScope.token = result.data.token; in line #17:

console.log($rootScope.token); 

So I'll go to my browser and notice here's the Object that's returned back. You've got data, token, and then this token string, and then when I look at $rootScope.token, there it is. Also notice it's in the main.html view as well. So if we go quick look at the main.html file, we'll see that in this paragraph, we're creating a span, which is bound to the "token" variable on the scope. And since the scope inherits from $rootScope, then "token" is also available from the $rootScope. So this example shows how our application might receive a "token", a bearer token from a server, and then store it on the $rootScope. Again your application will probably do this in a more complicated way, for instance, requiring the user to log in or what have you, but regardless we can grab the "token" from the server and store it on the $rootScope. 
The Sublime Text 2 editor is displayed with the main.js tabbed page open. The presenter navigates to the localhost:9000/#/ tabbed page displayed in the Google Chrome browser window. The tabbed page now displays the following information in its left pane:

Advanced AngularJS
Welcome to Advanced AngularJS!
My token is: A1B2C3D4E5F6.

The right pane of the tabbed page displays the DevTools window with the Object {data: Object} node and the text main.js:16 beside it. Below this node, the A1B2C3D4E5F6 node is displayed with the text main.js:18. He then expands the Object {data: Object} node and the following subnodes are displayed: data: Object and _proto_: Object. Then he expands the data: Object subnode and the following subnodes token: "A1B2C3D4E5F6" and _proto_: Object, are displayed. Next he highlights the A1B2C3D4E5F6 node.

Then he highlights the text A1B2C3D4E5F6 from the left pane of the tabbed page.

He then navigates to the Sublime Text 2 editor and selects the main.html subnode from the left pane. As a result, the main.html tabbed page is open in the right pane of the Sublime Text 2 editor. The tabbed page includes the following code:
```
1 <div class="row">
2 <h4> Advanced AngularJS</h4>
3 <p>
4 Welcome to Advanced AngularJS!
5 </p>
6
7 <p>My token is: <span ng-bind="token"></span>.</p>
8 </div>
9
```
The presenter highlights and explains the following code statement on line #7:

<p>My token is: <span ng-bind="token"></span>.</p>     

### app.js
```javascript
"use strict";
angular.module('myApp', ['ngResource']);


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
        console.log('MEX-001A: data: ' + JSON.stringify(data));
        console.log('MEX-001B: $rootScope.token: ' + $rootScope.token);
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

angular.module('myApp').service('AppModel', function ($http) {

    this.states = [{name:'Jalisco', abbreviation: 'GDL'}, {name:'Sonora', abbreviation: 'SON'}];


});

angular.module('myApp').controller('MainController', ['AppModel', function(AppModel) {

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
    <p>
        Welcome to Advanced AngularJS!
        </p>
        <p>My token is: <span ng-bind="token"></span>.</p>
</div>
</body>
</html>
```


### myWebServer.py
```phyton
import sys
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer

HandlerClass = SimpleHTTPRequestHandler
ServerClass  = BaseHTTPServer.HTTPServer
Protocol     = "HTTP/1.0"

class myHandler(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def do_GET(self):
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
	def do_POST(self):
		self.send.response(200)
		self.send_header("Content-type", "application/json")
		self.send_header("Access-Control-Allow-Origin", "*");
		self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin")
		self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested")
		self.end_headers()
	def do_OPTIONS(self):
		self.send.response(200)
		self.send_header("Content-type", "application/json")
		self.send_header("Access-Control-Allow-Origin", "*");
		self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin")		
try:

	if sys.argv[1:]:
		port = int(sys.argv[1])
	else:
		port = 80
	server_address = ('192.168.0.207', port)

	HandlerClass.protocol_version = Protocol
	httpd = ServerClass(server_address, myHandler)

	sa = httpd.socket.getsockname()
	print "Serving HTTP on", sa[0], "port", sa[1], "..."
	httpd.serve_forever()
	
except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	httpd.socket.close()
```