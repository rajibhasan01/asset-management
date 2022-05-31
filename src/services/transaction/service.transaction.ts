import { DbTransaction } from "./db.service.transaction";
import { Transaction } from "../../models/model.transaction";
import { TransactionInterface } from "../../interfaces/interface.transaction";

const dbTransaction = DbTransaction.getInstance();
export class TransactionService implements TransactionInterface {
    private static transactionService: TransactionService;
    private constructor() {}

    public static getInstance(){
        if (!TransactionService.transactionService){
            TransactionService.transactionService = new TransactionService();
        }
        return TransactionService.transactionService;
    }

    /**
     *
     * AddTransaction
     */
    public AddTransaction(transactionData: Transaction) {
        return new Promise(async (resolve, reject) =>{
            try {
                const result = await dbTransaction.CreateTransaction(transactionData);
                if (result === 'success') {
                    resolve('Transaction is Added Successfully');
                } else {
                    resolve('Failed to Add Transaction');
                }
            } catch (error) {
                console.log('Error in AddTransaction Method of TransactionService: ', error);
            }
        });
    }
    /**
     * GetTransaction
     */
    public GetTransaction() {
        return new Promise (async (resolve, reject) => {
            await dbTransaction.GetTransactionList()
            .then((result) => {
                resolve(result);
            })
            .catch((error) => reject(error));
        });
        }
    /**
     *
     * Edittransaction
     */

    public EditTransaction(transactionData: Transaction) {
        throw new Error('Method not implemented.');
    }

    /**
     *
     * GetTransactionById
     */

    public GetTransactionById(transactionTypeId: string) {
        return new Promise(async (resolve, reject) =>{
            await dbTransaction.GetTransactionById(transactionTypeId)
            .then((result) =>{
                resolve(result);
            })
            .catch ((error) => reject(error));
        });

    }

    /**
     *
     * @param EditTransactionById
     */

    public EditTransactionById(transactionId: string, transaction: Transaction) {
        return new Promise(async (resolve, reject) =>{
            await dbTransaction.EditTransactionById(transactionId, transaction)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => reject(error));
        });

    }
}