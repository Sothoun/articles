const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_USERNAME
});

const tableDefinitions = [
  {
    name: 'users',
    columns: `id INT NOT NULL AUTO_INCREMENT,username VARCHAR(255), password VARCHAR(255)`,
    primaryKey: 'id'
  },
  {
    name: 'articles',
    columns: ` id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      created_by INT NOT NULL, 
      is_published BOOLEAN NOT NULL DEFAULT false,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT NULL,
      FOREIGN KEY (created_by) REFERENCES users(id)`,
    primaryKey: 'id'
  },
];

connection.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    tableDefinitions.forEach((table) => {
      const query = `CREATE TABLE IF NOT EXISTS ${table.name} (${table.columns}, PRIMARY KEY(${table.primaryKey}))`;
      connection.query(query, (error) => {
        if (error) {
          console.error(`Error creating table ${table.name}:`, error);
        } else {
          console.log(`Table ${table.name} created successfully`);
        }
      });
    });
  }
});

module.exports = connection;