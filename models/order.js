var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    orderNo: String,
    datePlaced: Date,
    status: String,
    total: Number
});
userSchema.statics.getOrdersForPage = function (page, itemsPerPage, sort, orderNo, dateFrom, dateTo, status, cb) {
    var query = this.find();
    if (orderNo) {
        query.find({"orderNo": new RegExp(orderNo, 'i')});
    }
    if (dateFrom) {
        query.where('datePlaced').gt(dateFrom);
    }
    if (dateTo) {
        query.where('datePlaced').lt(dateTo);
    }
    if (status) {
        query.where('status').eq(status);
    }
    if (sort) {
        var sortArr = sort.split('-');
        var descAcs = sortArr[1] == 'asc' ? '' : '-';
        query.sort(descAcs + sortArr[0]);
    }
    query.exec(cb);
};

module.exports = mongoose.model('Order', userSchema);