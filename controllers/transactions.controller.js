// const Joi = require("joi");
// const transactionsService = require("../services/transactions.services");
// const { transactionsReponse } = require("../dt/transactionsResponse");

// const transactionsSchema = Joi.object({
//   date_time: Joi.string().required(),
//   type: Joi.string().required(),
//   from_to: Joi.number().required(),
//   description: Joi.string().required(),
//   amount: Joi.number().required(),
//   user_id: Joi.number().required(),
// });


// const createTransactions = async (req, res) => {
//   try {
//     const {id} = req.user;
//     const { error, value } = transactionsSchema.validate(req.body);

//     if (error) {
//       return res.status(400).json({ error: error?.message });
//     }
//     const transactions = await transactionsService.createTransactions(value, id);
//     res.status(201).json({data: new transactionsReponse(transactions)});
//   } catch (error) {
//     res.status(error.statusCode || 500).json({ error: error?.message });
//   }
// };

// const getTransactionsById =async (req, res) => {
//     try{
//         const {id} = req.user;
//         const transactions = await transactionsService.getTransactionsById(Number(id));
//         res.status(200).json({data: new transactionsReponse(transactions)});
//     } catch (error){
//         if(error?.message === "transactions not found"){
//             return res.status(404).json({error: error?.message});
//         }
//         res.status(error.status.statusCode||500).json({error:error?.message});
//     }
// }


//   module.exports = { createTransactions, getTransactionsById };