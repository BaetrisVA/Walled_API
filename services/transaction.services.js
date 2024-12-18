const bcrypt = require("bcrypt");
const userRepository = require("../repository/transactions.repository");
const { rows } = require("pg/lib/defaults");
// const { generateAccessToken } = require("../utils/aut.util");

    
const getTransactionById = async (id) => {
    let transaction = await transactionRepository.getTransactionById(id);
    if (transaction.rows.length === 0) {
      throw new Error("Transaction not found");
    }
    return transaction.rows[0];
  };

module.exports = { getTransactionById };