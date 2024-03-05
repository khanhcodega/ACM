const News = require('../models/News')
const { mutipleMongooseToObject } = require('../../util/mongoose')

const PAGE_SIZE = 9
class NewsController {
    index(req, res, next) {
        const page = req.query.page || 1
        const skipElement = (page - 1) * PAGE_SIZE

        const currentPage = News.find({})
            .skip(skipElement)
            .limit(PAGE_SIZE)
            .exec()
        const nextPage = News.find({})
            .skip(skipElement + PAGE_SIZE)
            .limit(PAGE_SIZE)
            .exec()

        const numberPage = News.countDocuments().exec()

        numberPage
            .then(numberPage => {
        console.log(numberPage);
        }).catch(err => {
            console.error(err);
        });

        Promise.all([currentPage, nextPage])
            .then(([currentData, nextData]) => {
                res.render('news',
                    {
                        currentData: mutipleMongooseToObject(currentData),
                        nextData: mutipleMongooseToObject(nextData)
                    })
            })
            .catch(err => {
                res.status(500).json('sever error')
            })
    }
}

module.exports = new NewsController