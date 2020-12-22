module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define('product', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.INTEGER,
			autoIncrement: true
		},
		material: { type: Sequelize.STRING },
		brand: { type: Sequelize.STRING },
		mrp: { type: Sequelize.INTEGER },
		discount: { type: Sequelize.INTEGER },
		price: { type: Sequelize.INTEGER },
		style: { type: Sequelize.STRING },
		description: { type: Sequelize.STRING, allowNull: false }
	});
	return Product;
}