export class Transaction {
  productId?: string;
  ticketNumber?: string;
  status?: number;
  private static transaction: Transaction;
  private constructor() {}
  /**
   * getInstance
   */
  public static getInstance() {
    if (!Transaction.transaction) {
      Transaction.transaction = new Transaction();
    }
    return Transaction.transaction;
  }
}
