const News = require('../models/News');
const Order = require('../models/Orders');
const Nurse = require('../models/Nurses');
const { model } = require('mongoose');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');
const Nurses = require('../models/Nurses');

class ManagerController {
    createView(req, res, next) {
        const dataType = req.query.type || 'news';
        let type;
        switch (dataType) {
            case 'news':
                type = 'tin tức';
                break;
            case 'nurses':
                type = 'điều dưỡng';
                break;
            case 'orders':
                type = 'đơn hàng';
                break;
            default:
                type = 'tin tức';
                return;
        }
        if (dataType === 'orders') {
            res.render('crud/createOrder',{
                type
            });
        } else {
            res.render('crud/create',{
                type
            });
        }
    }

    create(req, res, next) {
        const formData = req.body;
        const dataType = req.query.type || 'news';
        if (dataType != 'orders') {

            formData.content = `<div class="news-wrap-p">${req.body.content}</div>`;
            formData.link = 'tintuc' + req.body.heading.split(' ').join('-');
            if (!formData.date) {
                const date = new Date().toLocaleDateString('en-GB');
                formData.date = date;
            } else {
                formData.date = formData.date.split('-').reverse().join('/');
            }
        } else {
            if (!formData.recruimentDay) {
                const date = new Date().toLocaleDateString('en-GB');
                formData.recruimentDay = date;
            } else {
                formData.recruimentDay = formData.recruimentDay.split('-').reverse().join('/');
            }
        }


        let query, type;
        switch (dataType) {
            case 'news':
                query = new News(formData);
                break;
            case 'nurses':
                query = new Nurse(formData);
                break;
            case 'orders':
                query = new Order(formData);
                break;
            default:
                query = new News(formData);
                return;
        }

        query.save();
        res.redirect('store');
    }

    store(req, res, next) {
        const dataType = req.query.type || 'news';
        const PAGE_SIZE = 10;
        const page = req.query.page || 1;
        const skipElement = (page - 1) * PAGE_SIZE;

        let query, total, type;
        switch (dataType) {
            case 'news':
                query = News.find({})
                    .sort({ _id: -1 })
                    .skip(skipElement)
                    .limit(PAGE_SIZE)
                    .exec();
                total = News.countDocuments().exec();
                type = 'tin tức';
                break;
            case 'nurses':
                query = Nurses.find({})
                    .sort({ _id: -1 })
                    .skip(skipElement)
                    .limit(PAGE_SIZE)
                    .exec();
                total = Nurse.countDocuments().exec();
                type = 'điều dưỡng';
                break;
            case 'orders':
                query = Order.find({})
                    .sort({ _id: -1 })
                    .skip(skipElement)
                    .limit(PAGE_SIZE)
                    .exec();
                total = Order.countDocuments().exec();
                type = 'đơn hàng';
                break;
            default:
                query = News.find({})
                    .sort({ _id: -1 })
                    .skip(skipElement)
                    .limit(PAGE_SIZE)
                    .exec();
                total = News.countDocuments().exec();
                type = 'tin tức';
                return;
        }

        // Execute the query and send back the data
        Promise.all([query, total, type])
            .then(([query, total, type]) => {
                const totalPage = Math.ceil(total / PAGE_SIZE);
                if (dataType === 'orders') {
                    res.render('crud/storeOrder', {
                        data: mutipleMongooseToObject(query),
                        // pageList,
                        current: parseFloat(page),
                        totalPage,
                        type,
                        dataType,
                    });
                } else {
                    res.render('crud/store', {
                        data: mutipleMongooseToObject(query),
                        // pageList,
                        current: parseFloat(page),
                        totalPage,
                        type,
                        dataType,
                    });
                }
            })
            .catch((err) => {
                res.status(500).json('sever error');
            });
    }

    edit(req, res, next) {
        const dataType = req.query.type || 'news';
        let query, type;
        switch (dataType) {
            case 'news':
                query = News.findById(req.params.id);
                type = 'tin tức';
                break;
            case 'nurses':
                query = Nurse.findById(req.params.id);

                type = 'điều dưỡng';
                break;
            case 'orders':
                query = Order.findById(req.params.id);

                type = 'đơn hàng';
                break;
            default:
                query = News.findById(req.params.id);
                type = 'tin tức';
                return;
        }
        // console.log(dataType)

        // Execute the query and send back the data
        Promise.all([query, type])
            .then(([query, type]) => {
                if (dataType === 'orders') {
                    const time = query.recruimentDay.split('/');
                    query.recruimentDay = time.toReversed().join('-');
                    res.render('crud/editOrder', {
                        dataEdit: mongooseToObject(query),
                        type,
                        dataType
                    });
                } else {

                    const time = query.date.split('/');
                    query.date = time.toReversed().join('-');
                    res.render('crud/edit', {
                        dataEdit: mongooseToObject(query),
                        type,
                        dataType
                    });
                }
            })
            .catch(next);
    }

    update(req, res, next) {
        const dataType = req.query.type || 'news';
        // console.log(dataType)
        const formData = req.body;
        if(dataType ==='orders'){
            console.log('aaaaaaa')
            if (!formData.recruimentDay) {
                const date = new Date().toLocaleDateString('en-GB');
                formData.recruimentDay = date;
            } else {
                formData.recruimentDay = formData.recruimentDay.split('-').reverse().join('/');
            }
        }else{
            formData.link = 'tintuc' + req.body.heading.split(' ').join('-');
            if (!formData.date) {
                const date = new Date().toLocaleDateString('en-GB');
                formData.date = date;
            } else {
                formData.date = formData.date.split('-').reverse().join('/');
            }
        }
        
        let query, type;
        switch (dataType) {
            case 'news':
                query = News.updateOne({ _id: req.params.id }, formData);
                type = 'tin tức';
                break;
            case 'nurses':
                query = Nurse.updateOne({ _id: req.params.id }, formData);
                type = 'điều dưỡng';
                break;
            case 'orders':
                query = Order.updateOne({ _id: req.params.id }, formData);
                type = 'đơn hàng';
                break;
            default:
                query = News.updateOne({ _id: req.params.id }, formData);
                type = 'tin tức';
                return;
        }

        query.then(() => res.redirect('store')).catch(next);
    }

    delete(req, res, next) {
        const dataType = req.query.type || 'news';
        let query, type;
        switch (dataType) {
            case 'news':
                query = News.deleteOne({ _id: req.params.id })
                break;
            case 'nurses':
                query = Nurse.deleteOne({ _id: req.params.id })
                break;
            case 'orders':
                query = Order.deleteOne({ _id: req.params.id })
                break;
            default:
                query = News.deleteOne({ _id: req.params.id })
                return;
        }
        query.then(() => res.redirect('store'))
            .catch(next);
    }
}

module.exports = new ManagerController();
