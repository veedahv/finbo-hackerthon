var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const api = require('./api')


var express = require('express');
var path = require('path');
// var app = express();
app.use(express.static(path.join(__dirname,'dist')));

var port = process.env.PORT || 80



server.listen(port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});
// app.get('/asset', function (req, res) {
//   res.sendFile(__dirname + '/dist/index.html');
// });
// app.use('/assets', app.static(path.join(__dirname, 'dist','assets')))
// app.use(app.static(path.join(__dirname, 'dist','assets')));

io.on('connection', function (socket) {

  
  // socket.emit('status', { hello: 'world' });
  socket.on('query', function (data) {
    api.query(data,socket)
  });
  socket.on('chat', function (data) {
    api.chat(data,socket)
  });
  
});