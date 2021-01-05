const express = require('express');
const fs = require('fs');
const https = require('https');
const socket = require('socket.io');
const privateKey = fs.readFileSync('./config/credentials/server.key', 'utf8');
const certificate = fs.readFileSync('./config/credentials/fashionandfancy.crt', 'utf8');
// const ca = fs.readFileSync('./config/credentials/fashionandfancy.ca-bundle', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  requestCert: false
  // ca: ca
}

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

// Create a Server
const server = app.listen(port, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

// var server = https.createServer(credentials,app);

// var io = socket(server);

// io.on('connection', () => { 
//   console.log("Socket")
// });

// server.listen(port, () => {
//   console.log("HTTPS RUNNING",port);
// });

app.use('/', router);