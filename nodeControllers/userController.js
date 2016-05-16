var User = require('../models/user');
module.exports.getUsers = function(req, res) {
    User.getUsersForPage(req.query.page, req.query.itemsPerPage, req.query.sort, req.query.name, function (err, users) {
        if (!err) {
            User.count({}, function (err, count) {
                res.json({"users": users, usersCount: count});
            })
        } else {
            res.send(err);
        }
    });
};
module.exports.saveUser = function(req, res) {
    var user = new User({name: req.body.name, surname: req.body.surname});
    user.save(function(err) {
        if (!err) {
            User.find(function(err, users){
                if (!err){
                    return res.json(users);
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
module.exports.deleteUser = function(req, res) {
    User.remove({_id: req.params.id}, function(err) {
        if (err) {
            res.send(err);
        }
        User.find(function(err, users){
            if (err) {
                res.send(err);
            }
            res.json(users);
        })
    })
};