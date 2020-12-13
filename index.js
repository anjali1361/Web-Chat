//node server which will handle socket io connection

const io = require('socket.io')(8000)//initializing server(i.e socket.io , whiich is an instance of http) on 8000 port,which will listen to incoming events

const users={};//object for storing all users

io.on('connection', socket =>{//instance of io server which will listen to every connections and fires call back
    socket.on('new-user-joined',name=>{//listen to individual connections
        // console.log("New User", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name)//sends messages to every user expect the who joined,name is returned to correspondng client side code

    });

    socket.on('send',message =>{//wen someone sends a message
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    
    socket.on('disconnect',message =>{//wen someone sends a message
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    });

})
