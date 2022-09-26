module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('Admin', {
        // Model attributes are defined here
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        role: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 4
            // allowNull defaults to true
        }
    }, { timestamps: false });
    return User;
}