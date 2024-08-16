const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = require('./routes/books');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.UI_URL,
}));
app.use('/api/v1/book', router);

const SERVER_PORT = process.env.SERVER_PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_NAME = process.env.MONGODB_NAME;
const DB_URL = MONGODB_URL + MONGODB_NAME;

mongoose.connect(DB_URL)
    .then(()=> {
        console.log(`connected to DB: ${DB_URL}`);
        app.listen(SERVER_PORT, () => {
            console.log(`server running on ${SERVER_PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
    })
