const express = require('express');
const app = express();
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

app.listen(port, async () => {
    console.log(`Express server started on port ${port}`);
    await connection.connectDB();
});
