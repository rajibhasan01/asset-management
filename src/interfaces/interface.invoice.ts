import { Invoice } from './../models/model.invoice';

export interface InvoiceInterface {
  AddInvoice(invoiceData: Invoice): any;
  EditInvoice(invoiceId: string, invoiceData: Invoice): any;
  GetAllInvoice(): any;
  GetInvoiceById(invoiceId: string): any;
}
