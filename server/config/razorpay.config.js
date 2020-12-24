let Razorpay = require('razorpay');

// var instance = new Razorpay({
//     key_id: 'rzp_test_LXAH77WmQde9qB',
//     key_secret: 'yKBQ6YVABif8oR2lfH2b7VkW'
// });

// let RazorpayConfig = {
//     key_id: 'rzp_test_LXAH77WmQde9qB',
//     key_secret: 'yKBQ6YVABif8oR2lfH2b7VkW'
// }

var instance = new Razorpay({
    key_id: 'rzp_live_IumvyCiLN6HsNA',
    key_secret: '6y3GijmH7SaZizRI5gijBV2g'
});

let RazorpayConfig = {
    key_id: 'rzp_live_IumvyCiLN6HsNA',
    key_secret: '6y3GijmH7SaZizRI5gijBV2g'
}

module.exports = RazorpayConfig;
module.exports = instance;