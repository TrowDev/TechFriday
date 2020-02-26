const { Op } = require('sequelize');
const User = require('../models/UserDAO');
const cryptoRandomString = require('crypto-random-string');

module.exports = {
    async index(req, res) {

        var pagina = req.query.pagina;
        var contasPorPagina = 5;
        if (pagina === undefined) {
            pagina = 1;
        }
        var start = (pagina * contasPorPagina) - contasPorPagina;
        await User.findAll({
            offset: start,
            limit: contasPorPagina
        })
            .then(resp => {
                if (resp.length == 0) {
                    res.json({
                        status: 404,
                        message: "Nenhum usuário encontrado."
                    });
                } else {
                    res.json(resp)
                }
            })
            .catch(err => res.json(err));

        return;
    },
    async showByID(req, res) {
        const idUsuario = req.query.id;
        const usuario = await User.findOne({
            where: {
                id: idUsuario
            }
        });
        if (usuario) {
            res.json(usuario);
        } else {
            res.json({
                status: 404,
                message: "Usuário não encontrado!"
            });
        }
        return;
    },
    async logIn(req, res){
        const { usuario, senha } = req.body;
        const userInfo = await User.findOne({
            where: {
                usuario: usuario,
                senha: senha
            }
        });
        if(!userInfo){
            res.status(200).json({
                status: 404,
                message: "Usuário/Senha não correspondem a nenhum usuário."
            });
            return;
        }
        res.json({
            status: 200,
            message: "Login realizado com sucesso!",
            userid: userInfo.id,
            usuario: userInfo.usuario,
            token: userInfo.token
        });
        return;
    },
    async store(req, res) {
        const { usuario, email, senha } = req.body;
        await User.findOne({
            where: {
                [Op.or]: [
                    { usuario: usuario },
                    { email: email }
                ]
            }
        }).then(async (resp) => {
            if (resp==null || resp.length==0) {
                const token = cryptoRandomString({length: 64,type: 'base64'});
                await User.create({
                    usuario: usuario,
                    email: email,
                    senha: senha,
                    token: token,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }).then(resp => res.status(201).json(resp)).catch(err => res.json(err));
            } else {
                res.json({
                    status: 409,
                    message: "Usuário ou E-mail já registrado."
                });
            }
        }).catch(err => console.log(err));
        return;
    },
    async update(req, res) {
        const { idUsuario,senha, token } = req.body;
        const usuario = await User.findOne({
            where:{
                id: idUsuario,
                token: token
            }
        });
        if(!usuario){
            res.json({
                status: 404,
                message: "Usuário não encontrado."
            });
            return;
        }
        if(usuario.senha==senha){
            res.status(202).json({
                message: "A senha não foi alterada."
            });
            return;
        }
        usuario.senha = senha;
        usuario.save().then(resp => {
            res.json({
                message: "Dados atualizados com sucesso!"
            });
        }).catch(err => console.log(err));
    },
    async destroy(req, res) {
        const { idUsuario, token } = req.body;
        await User.destroy({
            where: {
                id: idUsuario,
                token: token,
            }
        }).then(resp => {
            if(resp==1){
                res.json({
                    message: "Usuário deletado com sucesso!"
                });
            }else{
                res.json({
                    status: 404,
                    message: "Usuário não encontrado."
                });
            }
        }).catch(err => res.json(err));
    }
}