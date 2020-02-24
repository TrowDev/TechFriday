const { Model, DataTypes } = require('sequelize');
const db = require('../config/dbConnect');

class User extends Model {}

User.init({
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: 'usuarios'
});

User.sync();

module.exports = User;