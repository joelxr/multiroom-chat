var app = require('./config/server');

var server = app.listen(8080, function () {
    console.log('servidor ONLINE');
});

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){
    console.log('usuario conectou');

    socket.on('disconnect', function() {
        console.log('usuario desconectou');
    });

    socket.on('msgParaServidor', function(data) {
        socket.emit(
                'msgParaCliente',
                {apelido: data.apelido, mensagem: data.mensagem}
                );

        socket.broadcast.emit(
                'msgParaCliente',
                {apelido: data.apelido, mensagem: data.mensagem}
                );

        socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
                );

        socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
                );
    });
});
