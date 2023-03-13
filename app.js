const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const postsRoute = require('./routes/posts');
app.use(bodyParser.json());
app.use(cors());
app.use('/posts', postsRoute);
module.exports = app;