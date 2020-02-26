const { Router } = require('express');
const routers   = Router();
const VotacoesController = require('./controllers/VotacoesController');
const UserController = require('./controllers/UserController');

// rotas de controle para Votacoes.
routers.get('/votacoes', VotacoesController.index);
routers.get('/votacao', VotacoesController.show);
routers.post('/votacao', VotacoesController.store);
routers.put('/votar', VotacoesController.update);
routers.delete('/deletarVotacao', VotacoesController.destroy);

// rotas de controle para User.
routers.get('/usuarios', UserController.index);
routers.get('/usuario', UserController.showByID);
routers.post('/login', UserController.logIn);
routers.post('/usuario', UserController.store);
routers.put('/atualizarUsuario', UserController.update);
routers.delete('/deletarUsuario', UserController.destroy);


module.exports = routers;