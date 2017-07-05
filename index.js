'use strict';

const fs = require('fs');
const express = require('express');
const concat = require('concat-stream');
const morgan = require('morgan');
const querystring = require('querystring');
const _ = require('lodash');
const func = require('./func');

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
		if (!err) {
      // commit file changes
      func.git.commit();
      return res.send(req.body.toString());
    }
	})
})

// File versioing 
app.use('/versions',  express.static('public'));
// Swagger Editor
app.use('/editor', express.static('swagger-editor'));
// Swager UI
app.use('/', express.static('swagger-ui/dist'));



// Git 
app.post('/specs/git/list', function (req, res) {
  var query = querystring.parse(req.body.toString(), null, null,{});
   func.git.log( (err, logs) => {
    if (!err) return res.send({current: query.current,rowCount: query.rowCount,rows: _.chunk(logs.all, query.rowCount)[parseInt(query.current)-1], total: logs.all.length})
   })
})  

app.post('/specs/git/revert', function (req, res) {
  func.git.revert(req.body.toString(), (err) => {
    if (!err) return res.send(`${req.body.toString()} reverted.`)
  })
})  

app.listen(process.env.PORT || 8080, function () {
  // init a git repo
  func.git.init();
  console.log('Swagger server running :D');
  console.log('Happy documenting');
})