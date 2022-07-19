const express = require('express');
const supervisors = require('./routes/supervisors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
  	'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});
app.use('/api', supervisors);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

