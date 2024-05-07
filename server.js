const express = require('express');
const app = express();
const http = require('http').createServer(app); // Create HTTP server instance
const io = require('socket.io')(http); // Initialize Socket.io and attach it to HTTP server
const catRoutes = require('./routes/catRoutes');
const connection = require('./db/connection');

const port = process.env.PORT || 3011;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', catRoutes);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

http.listen(port, async () => { // Change app.listen to http.listen
    console.log(`Express server started on port ${port}`);
    await connection.connectDB();
});

io.on('connection', (socket) => { 
    console.log('A user connected');
    
    
    const interval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 100);
        socket.emit('number', randomNumber);
        console.log(randomNumber);
    }, 1000);

    socket.on('disconnect', () => { 
        console.log('User disconnected');
        clearInterval(interval); 
    });
});
