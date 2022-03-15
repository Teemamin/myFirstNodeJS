const http = require('http')

const routes = require('./routes')

//createServer returns a server
const server = http.createServer(routes)
// createServer takes a function "request listnr6" as an arg that will be run on every incoming request

server.listen(3000)