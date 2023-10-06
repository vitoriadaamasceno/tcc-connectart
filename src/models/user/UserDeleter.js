const prisma = require("../../config/prisma");

class UserDeleter {
  async delete(id) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (user) {
        await prisma.user.delete({ where: { id: id } });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = new UserDeleter();
