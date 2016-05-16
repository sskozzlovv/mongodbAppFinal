var mongoose = require('mongoose');
var conf = require("../config");
mongoose.connect(conf.db.connection+conf.db.name);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected");
});
