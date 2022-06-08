import express from 'express';
import path from 'path';
import 'dotenv/config';
import registeredRouters from './routes/register-routing-files';
const app = express();
const port = process.env.PORT || 3000; // default port to listen
import bodyParser from 'body-parser';
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// define a route handler for the default home page

/**
 * Configuring view
 */
// set the view engine to ejs

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static('uploaded-image'))
app.use('/', registeredRouters);


// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
