const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Product = require('../models/product.model.js')(sequelize, Sequelize);
db.Files = require('../models/file.model.js')(sequelize, Sequelize);
db.Sizes = require('../models/size.model.js')(sequelize, Sequelize);
db.Purchase = require('../models/purchase.model.js')(sequelize, Sequelize);
db.Payment = require('../models/payment.model.js')(sequelize, Sequelize);

// Relations
db.Product.hasMany(db.Files);
db.Files.belongsTo(db.Product);

db.Product.hasMany(db.Sizes);
db.Sizes.belongsTo(db.Product);

module.exports = db;