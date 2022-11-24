const express = require('express');
const blogRouter = require('./routes/blogs');
const commentRouter = require('./routes/comments');
const connect = require('./schemas');
connect();
const app = express();
const port = 3000;

app.use(express.json());

app.use('/', [blogRouter, commentRouter]);

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
})