let razorpayInstance = require('../config/razorpay.config.js');
const db = require('../config/db.config.js');
const Purchase = db.Purchase;

exports.purchase = async (req, res) => {
    try{
        var options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: 'order_rcptid_11',
            payment_capture: '0'
        };
        console.log(razorpayInstance.orders)
        await razorpayInstance.orders.create(options, (err, order)=> {
            if (err) {
                console.log("razor error ", err)

                res.status(417).json({
                    message: err.message,
                    payload: null,
                    error: "razor pay order creation unsuccessful"
                });
            } 
            if(order){
                res.status(200).json({order,key: razorpayInstance.key_id})
            }
        });
        
    }
    catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}
