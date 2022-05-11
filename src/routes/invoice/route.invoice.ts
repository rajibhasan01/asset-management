import { invoiceImage } from './../../services/utility/functions';
import { fileUpload } from './../../services/utility/file-upload';
import { InvoiceService } from './../../services/invoice/service.invoice';
import express from 'express';
const invoiceRoute = express.Router();
const invoiceService = InvoiceService.getInstance();

invoiceRoute.get('/', (req, res) => {
  invoiceService
    .GetAllInvoice()
    .then((result) => {
      if (result) {
        res.render('pages/invoice-list.ejs', { invoiceData: result });
      } else {
        res.render('pages/invoice-list.ejs');
      }
    })
    .catch((err) => {
      console.log(`Can't get the data: ${err}`);
    });
});
// invoiceRoute.get('/:id', (req, res) => {
//   invoiceService
//     .GetInvoiceById(req.params.id)
//     .then((result) => {
//       if (result) {
//         res.status(200).json(result);
//       } else {
//         res.status(400).json(`Can't get the data`);
//       }
//     })
//     .catch((err) => {
//       console.log(`Can't get the data: ${err}`);
//     });
// });

invoiceRoute.post(
  '/create',
  fileUpload.fields([{ name: 'imageName', maxCount: 1 }]),
  invoiceImage,
  (req, res) => {
    invoiceService
      .AddInvoice(req.body)
      .then((result) => {
        res.render('pages/add-invoice.ejs', { message: result });
      })
      .catch((err) => console.log('error on invoice create route:', err));
  }
);
invoiceRoute.get('/add-invoice', (req, res) => {
  res.render('pages/add-invoice.ejs');
});
invoiceRoute.get('/edit/:id', (req, res) => {
  invoiceService
    .GetInvoiceById(req.params.id)
    .then((result) => {
      if (result) {
        res.render('pages/edit-invoice.ejs', { invoiceData: result });
      } else {
        res.render('pages/edit-invoice.ejs');
      }
    })
    .catch((err) => {
      console.log(`Can't get the data: ${err}`);
    });
});
invoiceRoute.post(
  '/edit/:id',
  fileUpload.fields([{ name: 'imageName', maxCount: 1 }]),
  invoiceImage,
  (req, res) => {
    invoiceService
      .EditInvoice(req.params.id, req.body)
      .then((result) => {
        invoiceService
          .GetAllInvoice()
          .then((invoiceData) => {
            res.redirect('/invoice');
          })
          .catch((err) => console.log('error on invoice edit route:', err));
      })
      .catch((err) => console.log('error on invoice edit route:', err));
  }
);

export = invoiceRoute;
