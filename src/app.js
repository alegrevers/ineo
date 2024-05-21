const express = require('express');
const users = require('./routes/user');
const protest = require('./routes/protest');
const fee = require('./routes/fee');
// const swaggerUi = require('swagger-ui-express')
// const swaggerFile = require('../swagger_output.json')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
})

// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/api/user', users);
app.use('/api/protest', protest);
app.use('/api/fee', fee);

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    console.error(`${err.name}: ${err.message}`);
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).send('An error occurred!')
  }
});

module.exports = app
