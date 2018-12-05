var http = require ('http');
// var usrData = require ('./db')
http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type':'text/html'});
	res.write('test'+ req.url);
	res.end();
}).listen(3000);