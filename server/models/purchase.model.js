module.exports = (sequelize, Sequelize) => {
    const Purchase = sequelize.define('purchase', {
        group_id:{
            type: Sequelize.STRING
        },
        business_id: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        recipient_name: {
            type: Sequelize.STRING
        },
        recipient_email:{
            type: Sequelize.STRING
        },
        user_email:{
            type: Sequelize.STRING
        },
        user_name:{
            type: Sequelize.STRING
        }
    });

    return Purchase;
}