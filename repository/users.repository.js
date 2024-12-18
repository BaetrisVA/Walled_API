// const pool = require("../db/db");
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Walled_db',
  password: 'Arianto185125.',
  port: 5432,
});

const findUserById = async (id) => {
    try {
      const result = await pool.query("SELECT * FROM users where id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      // console.log(error);
      throw new Error("Something went wrong");
    }
  };

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users where user_email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

const createUser = async (user) => {
  const { email, username, fullname, password, balance } = user;

  try {
    const result = await pool.query(
      "INSERT INTO users (email, username, fullname, password, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, username, fullname, password, balance]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};

module.exports = { createUser, findUserByEmail, findUserById };