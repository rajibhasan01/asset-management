class Invoice {
  title?: string;
  amount?: number;
  invoiceNumber?: string;
  cashType?: string;
  imageName?: string;
  imagePath?: string;
  createdAt?: Date;
  createdBy?: string;

  private static invoice: Invoice;

  private constructor() {}

  public static getInstance() {
    if (!Invoice.invoice) {
      Invoice.invoice = new Invoice();
    }
    return Invoice.invoice;
  }
}

export { Invoice };
