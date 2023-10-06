const prisma = require("../../config/prisma");

class UserFinder {
  async findById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          company: true,
        },
      });

      if (user == undefined) {
        return undefined;
      }

      return user;
    } catch (error) {
      console.log(error);
      // internal server error
      return undefined;
    }
  }

  async findAll() {
    try {
      const users = await prisma.user.findMany();

      return users;
    } catch (error) {
      console.log(error);
      // internal server error
      return [];
    }
  }

  async findByEmail(email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      return user;
    } catch (err) {
      console.log(err);
      // internal server error
      return undefined;
    }
  }

  async findByUsername(username) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      return user;
    } catch (err) {
      console.log(err);
      // internal server error
      return undefined;
    }
  }
}
module.exports = new UserFinder();
