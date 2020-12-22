const express = require('express');
var path = require('path');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
 
global.__basedir = __dirname;

require('./config/razorpay.config.js');
const db = require('./config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: false }');
}); 

let router = require('./routers/router.js');

const cors = require('cors')
app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public/product-uploads/")));
app.use('/', router);
// Create a Server
const server = app.listen(port, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})