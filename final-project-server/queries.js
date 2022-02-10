const { Client } = require("pg");

const client = new Client({
  connectionString:
    "postgres://rugabltwghhtoq:55eb9f12671571df6917e8f80d39ebf36f202cd17d3683830583bf055da0ca7f@ec2-52-208-185-143.eu-west-1.compute.amazonaws.com:5432/db7q6j4i3o8209",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

// GET all users
const getUsers = (request, response) => {
  client.query("SELECT * FROM users ORDER BY user_id ASC", (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

// GET a sigle user by ID
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  client.query(
    "SELECT * FROM users WHERE user_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

// POST a new user
const createUser = (request, response) => {
  const { name, email } = request.body;

  client.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

// PUT update user
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  client.query(
    "UPDATE users SET name = $1, email = $2 WHERE user_id = $3",
    [name, email, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// DELETE a user
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  client.query(
    "DELETE FROM users WHERE user_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

// GET all categories
const getCategories = (request, response) => {
  client.query(
    "SELECT * FROM categories ORDER BY category_id ASC",
    (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

// POST a new category
const createCategory = async (request, response) => {
  const { name } = request.body;
  client.query(
    "INSERT INTO categories (category_name) VALUES ($1) RETURNING *",
    [name],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      response.status(201).json(result.rows[0]);
    }
  );
};

// DELETE a category
const deleteCategory = (request, response) => {
  const id = parseInt(request.params.id);

  client.query(
    "DELETE FROM categories WHERE category_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCategories,
  createCategory,
  deleteCategory,
};
