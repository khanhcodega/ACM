const { mutipleMongooseToObject } = require('../../util/mongoose')
const Order = require('../models/Order')
const Programme = require('../models/Programme')
const NewsActivity = require('../models/NewsActivity')
const Feedback = require('../models/Feedback')


class SiteController {
    index(req, res, next) {
        const programmes = Programme.find({})
        const orders = Order.find({})
        const activities = NewsActivity.find({})
        const feedbacks = Feedback.find({})


        Promise.all([programmes, orders,activities,feedbacks])
            .then(([programmes, orders,activities,feedbacks]) => {
                res.render('home', {
                    programmes: mutipleMongooseToObject(programmes),
                    orders: mutipleMongooseToObject(orders),
                    activities: mutipleMongooseToObject(activities),
                    feedbacks: mutipleMongooseToObject(feedbacks)
                })
            })
            .catch(err => {
                res.status(500).json('sever error')
            })
    }
}

module.exports = new SiteController