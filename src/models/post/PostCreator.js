const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");

class PostCreator {
    async createPost(postData) {
        const {
            title,
            description,
            attachment
        } = postData;
        try {
            const post = await prisma.post.create({
                data: {
                    title: title,
                    description: description,
                    attachment: attachment
                },
            });
            return post;
        }
        catch (error) {
            console.log(error);
            return undefined;
        }


    }
}
module.exports = new PostCreator;