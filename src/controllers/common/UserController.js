//Dependencies
const bcrypt = require("bcrypt");
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

          return res.status(200).json(result);
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
        email,
        gender,
        profile_image
      } = req.body;

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
        date_of_birth,
        city,
        UF,
        email,
        gender,
        profile_image
      });
      const { password: pass, ...userWithoutPass } = user;
      return res.status(200).json(userWithoutPass);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
  
/////////////////////////////////////////////////
  async profile(req, res) {
    try {
      const { password, createdAt, updatedAt, ...userWithoutPass } = req.user;

      return res.status(200).json(userWithoutPass);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  async updateProfile(req, res) {
    try {
      const { username, email, phone, password, nickname } = req.body;
      const id = parseInt(req.user.id);


      if ([username, email, phone, password, nickname].some(field => field !== undefined && field.trim() === '')) {
        return res.status(400).json({
          message: "Invalid request body",
        });
      }
      
      const userToUpdate = await UserFinder.findById(id);
      const existsFields = [];
  
      if (email && email !== userToUpdate.email) {
        const emailExists = await UserCreator.validateDuplicateEmail(email);
        if (emailExists) {
          existsFields.push("email");
        }
      }
  
      if (phone && phone !== userToUpdate.phone) {
        const phoneExists = await UserCreator.validateDuplicatePhone(phone);
        if (phoneExists) {
          existsFields.push("phone");
        }
      }
  
      if (username && username !== userToUpdate.username) {
        const usernameExists = await UserCreator.validateDuplicateUsername(username);
        if (usernameExists) {
          existsFields.push("username");
        }
      }

      if (existsFields.length > 0) {
        return res.status(400).json({
          message: `Fields already exists: ${existsFields.join(", ")}`,
        });
      }

      const result = await UserEditor.updateUser(
        id,
        username,
        email,
        phone,
        password,
        nickname
      );

      if (result) {
        const { password: pass, ...userWithoutPass } = result;
        return res.status(200).json(userWithoutPass);
      } else {
        return res.status(400).json(result.err);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  async deleteProfile(req, res) {
    try {
      const id = parseInt(req.user.id);
      const deleteProfile = await UserDeleter.delete(id);

      if (deleteProfile) {
        return res.status(200).json({ message: "User deleted successfully" });
      } else {
        return res.status(404).json({ message: "User not found or already deleted" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

}

module.exports = new UserController();
