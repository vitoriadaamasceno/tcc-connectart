const path = require("path");
const UserFinder = require("../models/user/UserFinder");

class ViewsController {

    async index(req, res) {
        res.render("index");
        //pagina inicial
    }

    async login(req, res) {
        res.render("login");
    }

    async register(req, res) {
        res.render("register");
    }

    async bio(req, res) {
        res.render("bio");
    }

    async home(req, res) {
        try {
            const { id } = req.user;
            const user = await UserFinder.findById(id);
            const bio = await UserFinder.findBioById(id);
            // Renderize a página "timeline" e passe os dados do usuário
            res.render("timeline", { user, bio });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", error });
        }
    }
}

module.exports = new ViewsController();