const db = require('../config/db');

const Article = {
    create: async (title, content, created_by, is_published) => {
        const newArticle = new Article({
            title:title,
            content: content,
            created_by: created_by,
            is_published: is_published
        });
          newArticle.save()
          .then((article) => console.log("Article created successfully:", article))
          .catch((error) => console.error("Error creating article:", error));
    },

    findAll: async () => {
        const [results] = await db.query("SELECT * FROM articles");
        return results;
    },

    findById: async (id) => {
        try {
            const article = await Article.findById(id);
            if (article) {
              console.log('Found article:', document);
            } else {
              console.log('No article found with that ID');
            }
          } catch (err) {
            console.error(err);
          }
    },
    

    update: async (id, title, content, is_published) => {
        try {
          const article = await Article.findByPk(id);
      
          if (article) {
            article.title = title;
            article.content = content;
            article.is_published = is_published;
            await article.save();
            console.log("Article updated successfully:", article.dataValues);
          } else {
            console.log("Article not found with ID:", id);
          }
        } catch (error) {
          console.error("Error updating article:", error);
        }
      },

    delete: async (id) => {
        try {
          const article = await Article.findByPk(id);
      
          if (article) {
            await article.destroy();
            console.log("Article deleted successfully:", id);
          } else {
            console.log("Article not found with ID:", id);
          }
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      },
};

module.exports = Article;
