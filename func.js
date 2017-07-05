'use strict';
const git = require('simple-git')('files')
				.addConfig('user.name', process.env.gituser || 'swagger')
        		.addConfig('user.email', process.env.gitemail || 'swagger@swagger.com');
const func = {}

func.git = {}

func.git.init = () => {
	git.init(null, (err, done) => {
		if (!err) console.log("Git init for files");
	})	
}

func.git.commit = () => {
	git.add('./*')
        .commit(`${new Date().toString()} commit`);
    console.log(`${new Date().toString()} commit`);
}

func.git.log = (callback) => {
	git.log([], (err, logs) => {
		callback(err, logs)
	})	
}

func.git.revert = (hash, callback) => {
	git.revert(hash, [], (err) => {
		callback(err)
	})
}
module.exports = func;