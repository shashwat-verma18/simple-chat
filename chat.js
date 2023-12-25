const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./router/routes');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(3000);