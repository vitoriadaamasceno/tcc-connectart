const { userVerifyJwt } = require("../config/jwt");

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];

    try {
      const decoded = userVerifyJwt(token);

      if (decoded) {
        const {iat, exp, ...userWithoutIatExp } = decoded;
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
