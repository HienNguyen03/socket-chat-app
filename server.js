var express = require('express');

var app = express();

var connections = [];
var users = [];

app.use(express.static('./public'));

var server = app.listen(3000);

io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {

  socket.once('disconnect', function () {
    users = users.filter((user) => {
      return user.id != this.id;
    });
    console.log(users);
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnect: %s socket connected', connections.length);
    io.emit('disconnect', users);
  });
  
  socket.on('userJoined', function (payload) {
    var newUser = {
        id: this.id,
        name: payload.name
    };
    users.push(newUser);

    io.emit('userJoined', users);
    console.log('User joined:', payload.name);
  });

  socket.on('messageAdded', function (payload) {
    var newMessage = {
        timeStamp: payload.timeStamp,
        text: payload.text,
        user: payload.user
    };

    io.emit('messageAdded', newMessage);
  });

  connections.push(socket);
  console.log('connected: %s sockets connected', connections.length);
});

console.log('Server is running on port 3000');
