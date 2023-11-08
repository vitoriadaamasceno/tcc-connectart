//Dependencies
const bcrypt = require("bcrypt");
const { DateTime } = require('luxon');
// Local Dependencies
const UserCreator = require("../../models/user/UserCreator");
const UserFinder = require("../../models/user/UserFinder");
const UserDeleter = require("../../models/user/UserDeleter");
const UserEditor = require("../../models/user/UserEditor");
const { userSignJwtAccessToken } = require("../../config/jwt");

class UserController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Credentials not provided" });
      }

      const user = await UserFinder.findByEmail(email);

      if (user) {
        const passIsCorrect = await bcrypt.compare(password, user.password);

        if (passIsCorrect) {
          const { password, ...userWithoutPass } = user;
          const accessToken = userSignJwtAccessToken(userWithoutPass);
          res.set('Authorization', `Bearer ${accessToken}`);
          const result = {
            user: userWithoutPass,
            token: accessToken,
          };
          console.log(result)
          return res.status(200).redirect("/");

        } else {
          return res
            .status(401)
            .json({ message: "Invalid credentials (wrong email or password)" });
        }
      } else {
        return res
          .status(401)
          .json({ message: "Invalid credentials (wrong email or password)" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  async register(req, res) {
    try {
      const {
        full_name,
        username,
        password,
        phone,
        date_of_birth,
        city,
        UF,
        email
      } = req.body;

      const formattedDateOfBirth = DateTime.fromFormat(date_of_birth, 'yyyy-MM-dd').toJSDate();
      const undefinedFields = [];
      if (!email || email.trim() === '') {
        undefinedFields.push('email');
      }
      if (!phone || phone.trim() === '') {
        undefinedFields.push('phone');
      }
      if (!username || username.trim() === '') {
        undefinedFields.push('username');
      }
      if (!password || password.trim() === '') {
        undefinedFields.push('password');
      }

      if (undefinedFields.length > 0) {
        return res.status(400).json({
          message: "Invalid request body",
        });
      }

      const existsFields = [];
      const emailExists = await UserCreator.validateDuplicateEmail(email);
      const usernameExists = await UserCreator.validateDuplicateUsername(username);

      if (emailExists) {
        existsFields.push("email");
      }
      if (usernameExists) {
        existsFields.push("username");
      }
      console.log(existsFields)
      if (existsFields.length > 0) {
        return res.status(400).json({
          message: `Fields already exist: ${existsFields.join(", ")}`,
        });
      }

      const user = await UserCreator.createUser({
        full_name,
        username,
        password,
        phone,
        formattedDateOfBirth,
        city,
        UF,
        email
      });
      const { password: pass, ...userWithoutPass } = user;
      return res.status(200).json(userWithoutPass);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

}

module.exports = new UserController();
