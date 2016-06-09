//var User = require('../models/user');
var userController = require('../nodeControllers/userController');
var orderController = require('../nodeControllers/orderController');
module.exports = function (app) {
    app.get('/users', function (req, res) {userController.getUsers(req, res)});
    app.post('/user', function(req, res) {userController.saveUser(req, res)});
    app.delete('/user/:id', function(req, res) {userController.deleteUser(req, res)});
    app.get('/orders', function (req, res) {orderController.getOrders(req, res)});
    app.post('/order', function(req, res) {orderController.saveOrder(req, res)});
    app.delete('/order/:id', function(req, res) {orderController.deleteOrder(req, res)});
};