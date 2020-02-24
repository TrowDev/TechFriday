const Sequelize = require('sequelize');

const db = new Sequelize('trow', 'trow', '123', {
  host: 'localhost',
  dialect: 'mysql'
});

db.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = db;
