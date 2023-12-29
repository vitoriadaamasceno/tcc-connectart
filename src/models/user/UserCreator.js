const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");

class UserCreator {
  async createUser(userData) {
    const {
      full_name,
      username,
      password,
      phone,
      formattedDateOfBirth,
      city,
      UF,
      email
    } = userData;
    try {
      const hash = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          fullName: full_name,
          username: username,
          password: hash, 
          phone: phone,
          dateOfBirth: formattedDateOfBirth,
          city: city,
          UF: UF,
          email: email
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

  async createResume(bio, branch, languages, gender, profileImage, userId) {

    try {
      if (Object.keys(profileImage).length === 0 && profileImage.constructor === Object) {
        profileImage = null;
      }
      const resume = await prisma.resume.create({
        data: {
          bio: bio,
          branch: branch,
          languages: languages,
          gender: gender,
          profileImage: profileImage ?? null,
          userId: userId,
        },
      });
      if (resume) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
 
  
}

module.exports = new UserCreator();
