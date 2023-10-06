class HomeController{

    async index(req,res){
        res.send("Start");
    }
}

module.exports = new HomeController();