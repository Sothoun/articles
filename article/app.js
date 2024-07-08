const express = require("express");
const dotenv = require("dotenv");
const {
  createUser, 
  getAllUsers, 
  getSingleUser,
  updateUser,
  deleteUser
} = require("./controllers/userController");
// article controller 
const {
  createArticle, 
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} = require("./controllers/articleController");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.post("/api/users", createUser);
app.get("/api/users", getAllUsers);
app.get("/api/users/:id", getSingleUser);
app.put("/api/users/:id", updateUser);
app.delete("/api/users/:id", deleteUser);

// article 
app.post("/api/articles", createArticle);
app.get("/api/articles", getArticles);
app.get("/api/articles/:id", getArticleById);
app.put("/api/articles/:id", updateArticle);
app.delete("/api/articles/:id", deleteArticle);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
