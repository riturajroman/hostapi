require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/route');

app.get('/', (req, res) => {
    res.send('Hi from the server');
});
app.use(express.json());
app.use('/api/users/', routes);

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log('DB connection successful!'));

const start = () => {
    app.listen(port, () => {
        console.log(`we are live on PORT ${port}`);
    });
};

start();