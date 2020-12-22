const db = require('../config/db.config.js');
const Payment = db.Payment;

exports.pay = (req, res) => {
    let payment = req.body;
    try{
        // Save to MySQL database
        Payment.create(payment).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Payment Successfully",
                Payments: [result],
                error: ""
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            Payments: [],
            error: error.message
        });
    }
}

exports.retrieveAllOrders = (req, res) => {
    // find all orders information from 
    try{
        Payment.findAll()
        .then(PaymentInfos => {
            res.status(200).json({
                message: "Get all Payments' Infos Successfully!",
                Payments: PaymentInfos,
                error: ""
            });
        })
    }catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            Payments: [],
            error: error
        });
    }
}

exports.updatePaymentIdByOrderId = async (req, res) => {
    try {
        let orderId = req.params.orderId;
        // update new change to database
        let result = await Payment.update({ paymentId: req.body.paymentId }, { returning: true, where: { orderId: orderId } });

        // return the response to client
        if (!result) {
            res.status(500).json({
                message: "Error -> Can not update a Product with id = " + req.params.id,
                error: "Can NOT Updated",
                Payments: []
            });
        }

        res.status(200).json({
            message: "Update successfully a Order with id = " + orderId,
            Payments: [req.body.paymentId],
            error: ""
        });
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Product with id = " + req.params.id,
            error: error.message,
            products: []
        });
    }
}