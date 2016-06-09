var Order = require('../models/order');
module.exports.getOrders = function (req, res) {
    Order.getOrdersForPage(req.query.page, req.query.itemsPerPage, req.query.sort, req.query.orderNo, req.query.dateFrom,
        req.query.dateTo, req.query.status, function (err, orders) {
            var page = req.query.page || 1;
            var itemsPerPage = req.query.itemsPerPage || 10;
            if (!err) {
                var filteredOrders = orders.slice((page-1)*itemsPerPage, page*itemsPerPage);
                res.json({"orders": filteredOrders, ordersCount: orders.length});
            } else {
                res.send(err);
            }
        });
};
module.exports.saveOrder = function (req, res) {
    var order = new Order({orderNo: req.body.orderNo, datePlaced: req.body.datePlaced, status: req.body.status, total: req.body.total});
    order.save(function (err) {
        if (!err) {
            Order.find(function (err, orders) {
                if (!err) {
                    return res.json(orders);
                } else {
                    return res.send(err);
                }
            });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            res.send({error: 'Server error'});
        }
    })
};
module.exports.deleteOrder = function (req, res) {
    Order.remove({_id: req.params.id}, function (err) {
        if (err) {
            res.send(err);
        }
        Order.find(function (err, orders) {
            if (err) {
                res.send(err);
            }
            res.json(orders);
        })
    })
};