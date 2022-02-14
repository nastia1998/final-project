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
  client.query("SELECT * FROM categories ORDER BY id ASC", (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

// POST a new category
const createCategory = (request, response) => {
  const { name, description } = request.body;
  client.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
    [name, description],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      response.status(201).json(result.rows[0]);
    }
  );
};

// PUT update user
const updateCategory = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  client.query(
    "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
    [name, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      response.status(200).json(result.rows[0]);
    }
  );
};

// DELETE a category
const deleteCategory = (request, response) => {
  const id = parseInt(request.params.id);

  client.query(
    "DELETE FROM categories WHERE id = $1 RETURNING id",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows[0].id);
    }
  );
};

// GET all operations
const getOperations = (request, response) => {
  client.query(
    "SELECT * FROM operations ORDER BY operation_date DESC",
    (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

// POST a new operation
const createOperation = (request, response) => {
  const { categoryId, date, sum } = request.body;
  client.query(
    "INSERT INTO operations (category_id, operation_date, operation_sum) VALUES ($1, $2, $3) RETURNING *",
    [categoryId, date, sum],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      response.status(201).json(result.rows[0]);
    }
  );
};

// PUT update operation
const updateOperation = (request, response) => {
  const id = parseInt(request.params.id);
  const { categoryId, date, sum } = request.body;

  client.query(
    "UPDATE operations SET category_id = $1, operation_date = $2, operation_sum = $3 WHERE id = $4 RETURNING *",
    [categoryId, date, sum, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      response.status(200).json(result.rows[0]);
    }
  );
};

// DELETE an operation
const deleteOperation = (request, response) => {
  const id = parseInt(request.params.id);

  client.query(
    "DELETE FROM operations WHERE id = $1 RETURNING id",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows[0].id);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  // categories
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  // operations
  getOperations,
  createOperation,
  updateOperation,
  deleteOperation,
};
