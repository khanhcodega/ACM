const Nurse = require('../models/Nurse');
const { mutipleMongooseToObject } = require('../../util/mongoose');

const PAGE_SIZE = 9;
class NurseControler {
    index(req, res, next) {
        const page = parseInt(req.query.page || 1);
        const skipElement = (page - 1) * PAGE_SIZE;

        const currentPage = Nurse.find({})
            .skip(skipElement)
            .limit(PAGE_SIZE)
            .exec();
        const nextPage = Nurse.find({})
            .skip(skipElement + PAGE_SIZE)
            .limit(PAGE_SIZE)
            .exec();
        const total = Nurse.countDocuments().exec();

        Promise.all([currentPage, nextPage, total])
            .then(([currentData, nextData, total]) => {
                const totalPage = Math.ceil(total / PAGE_SIZE);
                const pageList = [];
                for (let i = 1; i <= totalPage; i++) {
                    pageList.push(i);
                }

                const nextPage = page < totalPage ? page + 1 : null;
                const prevPage = page > totalPage ? page - 1 : null;

                res.render('nurse', {
                    currentData: mutipleMongooseToObject(currentData),
                    nextData: mutipleMongooseToObject(nextData),
                    pageList,
                    currentPage: page,
                    nextPage,
                    prevPage,
                    totalPage
                });
            })
            .catch((err) => {
                res.status(500).json('sever error');
            });
    }
}

module.exports = new NurseControler();
