const prisma = require("../../config/prisma");

class UserDeleter {
  async delete(id) {
    try {
      const user = await prisma.user.delete({
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
}

module.exports = new UserDeleter();
