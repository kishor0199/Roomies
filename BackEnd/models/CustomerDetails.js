module.exports = (sequelize, DataTypes,User) => {

    const UserDetails = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique:true,
            allowNull:false
        },
        namefirst: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        namelast: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            references: {
                model: User,
                key: 'email'
            }
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: false
        },
        occupation: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.TINYINT,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isdeleted: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    }, {
        timestamps: false,
        tableName: "user"
    });

    return UserDetails;
};