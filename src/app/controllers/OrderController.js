const Order = require('../models/Order');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class OrderController {
    index(req, res, next) {
        Order.find({})
            .then((data) => {
                res.render('order', {
                    data: mutipleMongooseToObject(data),
                });
            })
            .catch((err) => {
                res.status(500).json('sever error');
            });

        // res.render('order')
    }
}

module.exports = new OrderController();
