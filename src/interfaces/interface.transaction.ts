import { Asset } from '../models/model.asset';
import { Transaction } from '../models/model.transaction';
export interface TransactionInterface {
  AddTransaction(transactionData: Transaction): any;
  EditTransaction(transactionData: Transaction): any;
  GetTransaction(): any;
  GetTransactionById(transactionTypeId: string): any;
  EditTransactionById(transactionId: string, transaction: Transaction): any;
}
