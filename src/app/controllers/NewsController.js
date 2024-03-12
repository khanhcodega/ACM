const News = require('../models/News');
const { mutipleMongooseToObject } = require('../../util/mongoose');

const PAGE_SIZE = 9;
class NewsController {
    index(req, res, next) {
        const page = req.query.page || 1;
        const skipElement = (page - 1) * PAGE_SIZE;

        const currentPage = News.find({})
            .skip(skipElement)
            .limit(PAGE_SIZE)
            .exec();
        const nextPage = News.find({})
            .skip(skipElement + PAGE_SIZE)
            .limit(PAGE_SIZE)
            .exec();

        const total = News.countDocuments().exec();

        Promise.all([currentPage, nextPage, total])
            .then(([currentData, nextData, total]) => {
                const totalPage = Math.ceil(total / PAGE_SIZE);
                const pageList = [];
                for (let i = 1; i <= totalPage; i++) {
                    pageList.push(i);
                }

                const nextPage = page < totalPage ? page + 1 : null;
                const prevPage = page > totalPage ? page - 1 : null;

                res.render('news', {
                    currentData: mutipleMongooseToObject(currentData),
                    nextData: mutipleMongooseToObject(nextData),
                    pageList,
                    currentPage: page,
                    nextPage,
                    prevPage,
                    totalPage,
                });
            })
            .catch((err) => {
                res.status(500).json('sever error');
            });
    }

    show(req,res,next){
        res.send('hehe')
    }
}

module.exports = new NewsController();
