const config = require("../config/db.config");
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = Sequelize.DataTypes;

db.User = require("./User")(sequelize, Sequelize);
db.UserDetails = require("./CustomerDetails")(sequelize, db.DataTypes,db.User);
db.OwnerDetails = require("./OwnerDetails")(sequelize, db.DataTypes,db.User);

db.User.hasOne(db.UserDetails, { foreignKey: "email", sourceKey: "email" });
db.UserDetails.belongsTo(db.User, { foreignKey: 'email', targetKey: 'email' });

db.User.hasOne(db.OwnerDetails, { foreignKey: "email", sourceKey: "email" });
db.OwnerDetails.belongsTo(db.User, { foreignKey: 'email', targetKey: 'email' });

module.exports = db;