const News = require('../models/News');
const Order = require('../models/Orders');
const Nurse = require('../models/Nurses');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class NewsController {
    index(req, res, next) {
        const PAGE_SIZE = 9;
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

    show(req, res, next) {
        const PAGE_SIZE = 6;

        // res.send(req.params.slug)
        const newDetail = News.findOne({ link: 'tintuc/' + req.params.slug });
        const nurseDetail = Nurse.findOne({
            link: 'tintuc/' + req.params.slug,
        });

        const nearestNews = News.find({
            link: { $ne: 'tintuc/' + req.params.slug },
        })
            .limit(PAGE_SIZE)
            .exec();
        const nearestNurse = Nurse.find({
            link: { $ne: 'tintuc/' + req.params.slug },
        })
            .limit(PAGE_SIZE)
            .exec();

        const totalNews = News.countDocuments().exec();
        const totalOrder = Order.countDocuments().exec();
        const totalNurse = Nurse.countDocuments().exec();

        Promise.all([
            newDetail,
            nurseDetail,
            totalNews,
            totalOrder,
            totalNurse,
            nearestNews,
            nearestNurse,
        ])
            .then((results) => {
                const [
                    newsData,
                    nurseData,
                    totalNews,
                    totalOrder,
                    totalNurse,
                    nearestNews,
                    nearestNurse,
                ] = results;
                const data = newsData ? {
                    data: newsData,
                    tag: 'tin tức',
                    link: 'tintuc'
                } : {
                    data: nurseData,
                    tag: 'điều dưỡng',
                    link: 'nurse'
                }
                // const titleNews = newsData ?  : 'điều dưỡng';
                // const tagTitle = newsData ? 'tintuc' : 'nurse'

                const nearestData = newsData ? nearestNews : nearestNurse;
                res.render('newsDetail', {
                    data: mongooseToObject(data.data),
                    nearestData: mutipleMongooseToObject(nearestData),
                    totalNews,
                    totalOrder,
                    totalNurse,
                    tag: data.tag,
                    link: data.link,

                });
            })
            .catch((err) => {
                res.status(500).json('sever error');
            });
    }
}

module.exports = new NewsController();
