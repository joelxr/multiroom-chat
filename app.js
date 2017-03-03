var app = require('./config/server');

var server = app.listen(8080, function () {
    console.log('servidor ONLINE');
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log('usuario conectou');

    socket.on('disconnect', function() {
        console.log('usuario desconectou');
    });
});
