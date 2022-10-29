require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const truckRoute = require('./routes/truck');
const pathRoute = require('./routes/path');

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

app.use(express.json());
app.use('/trucks', truckRoute);
app.use('/paths', pathRoute);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})


