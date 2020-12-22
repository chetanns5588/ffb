module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define('file', {
        fileId: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
		},
        type: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        path: {
            type: Sequelize.STRING
        }
    });

    return File;
}