import express from 'express';
import { TransactionService } from '../../services/transaction/service.transaction';

const transactionRoute = express.Router();
const transactionService = TransactionService.getInstance();

/**
 * Get all transaction
 */
transactionRoute.get('/', (req, res) => {
    transactionService
        .GetTransaction()
        .then((result) => {
            if (result) {
                res.send(result);
            } else{
                res.send({msg: "nothing found"});
            }
        })
});

/**
 * Post transaction
 */
transactionRoute.post('/add-transaction', async (req, res) =>{
    try{
        const result = await transactionService.AddTransaction(req.body);
        if(result){
            res.send({message: result})
        } else {
            res.send({message: 'result'})
        }
    } catch (error) {
        console.log('Error in add transaction post route: ', error);
    }
})

export = transactionRoute;