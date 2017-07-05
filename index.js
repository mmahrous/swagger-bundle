'use strict';

const fs = require('fs');
const express = require('express');
const concat = require('concat-stream');
const morgan = require('morgan');

const app = express()

// logging 
app.use(morgan('[:date] - :method :url :status - :response-time ms'));

// parse the req body
app.use(function(req, res, next){
  req.pipe(concat(function(data){
    req.body = data;
    next();
  }));
});

// BackEnd URLs
app.get('/editor/spec', function (req, res) {
   fs.createReadStream('./files/spec.yaml').pipe(res);
})

app.put('/editor/spec', function (req, res) {
	fs.writeFile('./files/spec.yaml', req.body, {encoding: 'utf8'}, (err) => {
		if (!err) return res.send(req.body.toString());
	})
})

// Swagger Editor
app.use('/editor', express.static('swagger-editor'));
// Swager UI
app.use('/', express.static('swagger-ui/dist'));

app.listen(process.env.PORT || 8080, function () {
  console.log('Swagger server running :D');
  console.log('Happy documenting');
})