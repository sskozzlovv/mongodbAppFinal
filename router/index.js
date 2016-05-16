//var User = require('../models/user');
var userController = require('../nodeControllers/userController');
module.exports = function (app) {
    app.get('/users', function (req, res) {userController.getUsers(req, res)});
    app.post('/user', function(req, res) {userController.saveUser(req, res)});
    app.delete('/user/:id', function(req, res) {userController.deleteUser(req, res)});

    app.get('*', function(req, res) {
        res.sendfile('./public/index1.html')
    });
};