const prisma = require("../../config/prisma");

class UserFinder {
  async findById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async findAll() {
    try {
      const users = await prisma.user.findMany();

      return users;
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  
}
module.exports = new UserFinder();
