var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    surname: String
});
userSchema.statics.getUsersForPage = function (page, itemsPerPage, sort, name, cb) {
    var itemsPerPage = itemsPerPage || 10;
    var page = page || 1;
    var query = this.find().limit(itemsPerPage);
    if (name) {
        query.find({"name": new RegExp(name, 'i')});
    }
    if (page) {
        query.skip(itemsPerPage * (page - 1));
    }
    if (sort) {
        var sortArr = sort.split('-');
        var descAcs = sortArr[1] == 'asc' ? '' : '-';
        query.sort(descAcs + sortArr[0]);
    }
    query.exec(cb);
};

module.exports = mongoose.model('User', userSchema);