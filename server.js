const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const port = 3000;
const router = require("./src/routes/routes");
const cors = require('cors');
//const session = require("express-session");
const Auth = require("./src/middlewares/Auth");

//Session
/* app.use(session({
  secret: 'kmknknknj',
  cookie: { maxAge: 60000 },


})); */

// Configurar o EJS como mecanismo de renderização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

//cors 
app.use(cors());
// Servir arquivos estáticos (CSS, imagens, etc.) a partir da pasta "public"
app.use(express.static(path.join(__dirname, "src", "public")));
//
//bodyparsser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}/`)
);
