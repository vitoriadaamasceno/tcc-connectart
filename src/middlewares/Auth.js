const { userVerifyJwt } = require("../config/jwt");

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];
  const tokenFromQuery = req.query.token;

  if (authToken != undefined) {
    // Processar o token no cabeçalho Authorization
    const bearer = authToken.split(" ");
    const token = bearer[1];

    try {
      const decoded = userVerifyJwt(token);

      if (decoded) {
        const { iat, exp, ...userWithoutIatExp } = decoded;
        req.user = userWithoutIatExp;
        next();
      } else {
        res.status(403);
        res.json({ message: "Forbidden" });
        return;
      }
    } catch (err) {
      res.status(401);
      res.send("Unauthorized");
      return;
    }
  } else if (tokenFromQuery != undefined) {
    // Processar o token no parâmetro da URL
    try {
      const decoded = userVerifyJwt(tokenFromQuery);

      if (decoded) {
        const { iat, exp, ...userWithoutIatExp } = decoded;
        req.user = userWithoutIatExp;
        next();
      } else {
        res.status(403);
        res.json({ message: "Forbidden" });
        return;
      }
    } catch (err) {
      res.status(401);
      res.send("Unauthorized");
      return;
    }
  } else {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }
};
