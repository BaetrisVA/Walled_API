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
  const { email, username, fullname, password, avatar_url } = user;

  const client = await pool.connect();
  console.log(email, "email apa")

  try {
    await client.query("BEGIN");
    const userResult = await client.query(
      `INSERT INTO public.users (email, username, fullname, password, avatar_url) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING email, username, fullname, password, avatar_url`,
      [email, username, fullname, password, avatar_url]
    );
    const newUser = userResult.rows[0];

    const walletResult = await client.query(
      `INSERT INTO wallets (user_id, balance) 
       VALUES ($1, $2) 
       RETURNING id, account_number, balance, created_at, updated_at`,
      [newUser.id, 0.0]
    );
    const newWallet = walletResult.rows[0];

    await client.query("COMMIT");

    return {
      ...newUser,
      wallet: newWallet,
    };
  } catch (error) {
    console.log(error)
    await client.query("ROLLBACK");
    throw new Error(
      "Database error occurred while creating the user and wallet."
    );
  } finally {
    client.release();
  }
};

module.exports = { createUser, findUserByEmail, findUserById };