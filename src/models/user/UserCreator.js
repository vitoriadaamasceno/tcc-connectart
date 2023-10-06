const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");

class UserCreator {
  async createUser(userData) {
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
    } = userData;
    try {
      const hash = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          fullName: full_name,
          username: username,
          password: hash, 
          phone: phone,
          dateOfBirth: date_of_birth,
          city: city,
          UF: UF,
          email: email,
          gender:gender ?? null,
          profileImage: profile_image ?? null,
         },
      });
      return user;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async validateDuplicateEmail(email) {
    try {
      const consult = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (consult != undefined) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async validateDuplicateUsername(username) {
    try {
      const consult = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (consult != undefined) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

 
  
}

module.exports = new UserCreator();
