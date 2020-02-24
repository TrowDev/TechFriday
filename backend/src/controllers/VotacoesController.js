const Votacoes = require('../models/VotacoesDAO');

module.exports = {
    async index(req, res) {
        const User = require('../models/UserDAO');
        var pagina = req.query.pagina;
        var assuntosPorPagina = 5;
        if (pagina === undefined) {
            pagina = 1;
        }
        var start = (pagina * assuntosPorPagina) - assuntosPorPagina;
        User.hasMany(Votacoes, { foreignKey: 'id' });
        Votacoes.belongsTo(User, { foreignKey: 'autor_id' });
        await Votacoes.findAll({
            offset: start,
            limit: assuntosPorPagina,
            include: [{
                model: User,
                required: true,
                attributes: {
                    exclude: ['senha', 'token', 'id', 'createdAt', 'updatedAt']
                }
            }],
        })
            .then(result => {
                if (result.length == 0) {
                    res.status(404).json({
                        message: "Nada encontrado"
                    });
                } else {
                    res.json(result);
                }
            })
            .catch(err => res.json(err));
        return;
    },
    async show(req, res) {
        const User = require('../models/UserDAO');
        var idVotacao = req.query.id;
        if (idVotacao !== undefined) {
            User.hasMany(Votacoes, { foreignKey: 'id' });
            Votacoes.belongsTo(User, { foreignKey: 'autor_id' });
            await Votacoes.findOne({
                where: {
                    id: idVotacao
                },
                include: [{
                    model: User,
                    required: true,
                    attributes: {
                        exclude: ['senha', 'token', 'id', 'createdAt', 'updatedAt']
                    }
                }],
            })
                .then(result => {
                    if (result == null) {
                        res.status(404).json({
                            message: "Nada encontrado"
                        });
                    } else {
                        res.json(result);
                    }
                })
                .catch(err => res.json(err));
        } else {
            res.status(406).json({
                message: "ID do assunto não informado."
            });
        }
        return;
    },
    async store(req, res) {
        const { autor_id, assunto, resumo } = req.body;
        var votos = 0;
        await Votacoes.create({
            autor_id: autor_id,
            assunto: assunto,
            resumo: resumo,
            votos: votos,
            createdAt: new Date(),
            updatedAt: new Date()
        })
            .then(resp => res.json(resp))
            .catch(err => res.json(err));
        return;
    },
    async update(req, res) {
        const { idVotacao } = req.body;
        const votacaoExiste = await Votacoes.findOne({ where: { id: idVotacao } });
        if (votacaoExiste) {
            Votacoes.increment({
                'votos': 1
            }, {
                where: {
                    id: idVotacao
                }
            })
                .then(result => res.json({
                    message: "Voto realizado com sucesso!",
                    votos: votacaoExiste.votos + 1
                }))
                .catch(err => res.json(err));
        } else {
            res.status(404).json({
                message: "ID de votação não encontrado."
            });
        }
        return;
    },
    async destroy(req, res) {
        const { idVotacao } = req.body;
        await Votacoes.destroy({
            where: {
                id: idVotacao
            }
        })
            .then(resp => {
                if (resp >= 1) {
                    res.json({
                        message: "Deletou com sucesso!"
                    });
                } else {
                    res.status(404).json({
                        message: "ID de votação não encontrado."
                    });
                }
            })
            .catch(err => res.json(err));
        return;
    }
}