const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/dbConnect');

class Votacoes extends Model {}

Votacoes.init({
    autor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    assunto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resumo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    votos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    sequelize: db,
    modelName: 'votacoes'
});

Votacoes.sync();

// Votacoes.sync({force: true});

module.exports = Votacoes;