import express from "express";
import { ProductService } from "../../services/product/service.product";
import { TransactionService } from "../../services/transaction/service.transaction";

const transactionRoute = express.Router();
const transactionService = TransactionService.getInstance();
const productService = ProductService.getInstance();

/**
 * Get all transaction
 */
transactionRoute.get("/", (req, res) => {
  transactionService.GetTransaction().then((result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ msg: "nothing found" });
    }
  });
});

/**
 * Post transaction
 */
transactionRoute.post("/add-transaction", async (req, res) => {
  try {

    const result = await transactionService.AddTransaction(req.body);
    const products :any = await productService.GetProductList();
    const transit :any = await transactionService.GetTransaction();

    if (transit && products){
        const productsLength = products.length;
        const transitLength = transit.length;

        for (let i=0; i<productsLength; i++){
          for (let j= 0; j<transitLength; j++){
            if(products[i]._id.toString() === transit[j].productId.toString() && transit[j].status === "1"){
              products[i].ticket = transit[j].ticketNumber;
              products[i].status = "assigned";
            }
          }
        }
      }
    if (result) {
      res.render("pages/product-list.ejs", { products });
    } else {
      res.render("pages/product-list.ejs");
    }
  } catch (error) {
    console.log("Error in add transaction post route: ", error);
  }
});

export = transactionRoute;
