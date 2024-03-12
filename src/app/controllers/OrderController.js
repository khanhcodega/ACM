const Order = require('../models/Orders');

const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');
class OrderController {
    index(req, res, next) {
        Order.find({})
            .then((data) => {
                res.render('orders', {
                    data: mutipleMongooseToObject(data),
                });
            })
            .catch((err) => {
                res.status(500).json('sever error');
            });

        // res.render('order')
    }
    show(req, res, next) {
        const order = Order.findOne({ id: parseInt(req.params.slug) });

        const orders = Order.find({ id: { $ne: parseInt(req.params.slug) } });

        Promise.all([order, orders])
            .then(([order, orders]) => {
                res.render('orderDetail', {
                    order: mongooseToObject(order),
                    orders: mutipleMongooseToObject(orders),
                });
            })
            .catch((err) => {
                // res.status(500).json('sever error');
                next;
            });
    }
}

module.exports = new OrderController();
