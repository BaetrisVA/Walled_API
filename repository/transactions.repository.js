// const pool = require("../db/db");
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Walled_db',
  password: 'Arianto185125.',
  port: 5432,
});

// const getTransactionById = async (id) => {
//     try {
//       const result = await pool.query("SELECT * FROM transactions", [
//         id,
//       ]);
//       return result;
//     } catch (error) {
//       throw new Error("Something went wrong");
//     }
//   };
const getTransactions = (req, res) => {
  pool.query(`SELECT * FROM transactions`, (error, results) => {
    if(error){
      throw error
    }
    res.status(200).json(results.rows)
  })
};


const findTransactionsById = async (user_id) => {
    try {
      const result = await pool.query("SELECT * FROM transactions where id = $1", [user_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };


const createTransactions = async (transactions) => {
  const {date_time, type, from_to, description, amount} = transactions;

  try {
    const result = await pool.query(
      "INSERT INTO transactions (date_time, type, from_to, description, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [date_time, type, from_to, description, amount]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error)
    throw new Error("Database error occurred while creating the transactions.");
  }
};

module.exports = { getTransactions, findTransactionsById, createTransactions };