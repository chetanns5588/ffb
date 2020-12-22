let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
let purchase = require('../controllers/purchase.controller');
let payment = require('../controllers/payment.controller');

const products = require('../controllers/product.controller.js');
const files = require('../controllers/file.controller.js');

router.post('/api/products/create', products.create);
router.get('/api/products/retrieveinfos', products.retrieveAllProducts);
router.put('/api/products/updatebyid/:id', products.updateById);
router.delete('/api/products/deletebyid/:id', products.deleteById);
router.get('/api/products/retreivebyid/:id', products.retreiveById);

router.post('/api/file/uploadFiles/:prodId', upload.array('files'), files.uploadFiles);
router.get('/api/listFilesByProdId/:prodId', files.listAllFiles);

router.post('/api/user-purchase/purchase', purchase.purchase);

router.post('/api/user-payment/payment', payment.pay);
router.get('/api/user-payment/retrieveAllOrders', payment.retrieveAllOrders);
router.put('/api/user-payment/updatePaymentIdByOrderId/:orderId', payment.updatePaymentIdByOrderId)

module.exports = router;