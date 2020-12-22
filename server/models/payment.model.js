module.exports = (sequelize, Sequelize) => {
	const Payment = sequelize.define('payment', {
		paymentId: { type: Sequelize.STRING, primaryKey: true },
        orderId: { type: Sequelize.STRING },
		signature: { type: Sequelize.STRING },
		email: { type: Sequelize.STRING },
		contact: { type: Sequelize.INTEGER },
		address: { type: Sequelize.STRING },
		productId: { type: Sequelize.STRING },
		paymentStatus: { type: Sequelize.STRING }
	});
	return Payment;
}