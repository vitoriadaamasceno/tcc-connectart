const path = require("path");

class HomeController {

    async index(req, res) {
        res.send("Hello World")
        //pagina inicial
    }
    
    async login(req, res) {
        res.render("index");
    }
}

module.exports = new HomeController();