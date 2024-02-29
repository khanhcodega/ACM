class IntroduceController {
    index(req,res) {
        res.render('introduce')
    }
}

module.exports = new IntroduceController
