const connection = require("../config/db");

const User = {
  create: async (username, password) => {
    const newUser = new User({
      username:username,
      password: password,
    });
    newUser.save()
    .then((user) => console.log("User created successfully:", user))
    .catch((error) => console.error("Error creating user:", error));
  },

  findAll: async () => {
    const [results] = await db.query("SELECT * FROM users");
    return results;
  },

  findById: async (id) => {
    const [results] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return results[0];
  },

  
  update: async (id, username, password) => {
    try {
      const user = await User.findByPk(id);
      if (user) {
        if (username) {
          user.username = username;
        }
        if (password) {
          user.password = password; 
        }
        await user.save();
        console.log("User updated successfully:", user.dataValues);
      } else {
        console.log("User not found with ID:", id);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
  
  delete: async (id) => {
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        console.log("User deleted successfully:", id);
      } else {
        console.log("User not found with ID:", id);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },
  
  searchUsers: async (searchCriteria) => {
    const query = "SELECT * FROM users WHERE name LIKE ?";
    const searchValue = `%${searchCriteria}%`;
    connection.query(query, [searchValue, searchValue]);
  },
};



module.exports = User;
