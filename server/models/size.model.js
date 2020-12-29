module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define('size', {
        sizeId: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
		},
        name: {
            type: Sequelize.STRING
        }
    });

    return Size;
}