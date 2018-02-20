const mongoose = require('mongoose')
const fs = require('fs')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:OxVQa9sYoQgnFKKj@ds143678.mlab.com:43678/heroku_g9hscg30', (err) => {
	if (err) throw err
})

exports.Driver = require('./driver')
