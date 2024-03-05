const Nurse = require('../models/Nurse')
const { mutipleMongooseToObject } = require('../../util/mongoose')

const PAGE_SIZE = 9
class NurseControler {
    index(req, res, next) {
        const page = req.query.page || 1
        const skipElement = (page - 1) * PAGE_SIZE

        const currentPage = Nurse.find({})
            .skip(skipElement)
            .limit(PAGE_SIZE)
            .exec()
        const nextPage = Nurse.find({})
            .skip(skipElement + PAGE_SIZE)
            .limit(PAGE_SIZE)
            .exec()
        const numberPage = Nurse.countDocuments().exec()

        numberPage
        .then(numberPage => {
            console.log(numberPage);
        }).catch(err => {
            console.error(err);
        });

        Promise.all([currentPage, nextPage])
            .then(([currentData, nextData]) => {
                res.render('nurse',
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

module.exports = new NurseControler