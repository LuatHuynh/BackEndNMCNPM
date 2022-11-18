class DefaultController{

    index(req, res){
        res.send('Hello World');
    }

}

module.exports = new DefaultController;