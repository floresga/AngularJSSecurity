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
