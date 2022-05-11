import { DbInvoice } from './db.invoice';
import { Invoice } from '../../models/model.invoice';
import { InvoiceInterface } from './../../interfaces/interface.invoice';

const dbInvoice = DbInvoice.getInstance();
export class InvoiceService implements InvoiceInterface {
  public static invoiceService: InvoiceService;
  private constructor() {}
  public static getInstance() {
    if (!InvoiceService.invoiceService) {
      InvoiceService.invoiceService = new InvoiceService();
    }
    return InvoiceService.invoiceService;
  }
  async AddInvoice(invoiceData: Invoice) {
    try {
      return await new Promise((resolve, reject) => {
        dbInvoice
          .CreateInvoice(invoiceData)
          .then((res) => resolve('Invoice Added Successfully'))
          .catch((err) => reject('Failed to add invoice. Please try again'));
      });
    } catch (err) {
      console.log('error in AddInvoice method of InvoiceService Class: ', err);
    }
  }
  async EditInvoice(invoiceId: string, invoiceData: Invoice) {
    try {
      return await new Promise((resolve, reject) => {
        dbInvoice
          .EditInvoice(invoiceId, invoiceData)
          .then((res) => resolve('Invoice Edit Successfully'))
          .catch((err) => reject('Failed to Edit invoice. Please try again'));
      });
    } catch (err) {
      console.log('error in EditInvoice method of InvoiceService Class: ', err);
    }
  }
  async GetAllInvoice() {
    try {
      return await new Promise((resolve, reject) => {
        dbInvoice
          .GetAllInvoice()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => reject(err));
      });
    } catch (err) {
      console.log(
        'error in GetAllInvoice method of InvoiceService Class: ',
        err
      );
    }
  }
  async GetInvoiceById(invoiceId: string) {
    try {
      return await new Promise((resolve, reject) => {
        dbInvoice
          .GetInvoiceById(invoiceId)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => reject(err));
      });
    } catch (err) {
      console.log(
        'error in GetInvoiceById method of InvoiceService Class: ',
        err
      );
    }
  }
}
