import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import api from '../../services/api';
import VoteItem from '../../components/VoteItem';

function VotacoesAbertas({ navigation }) {

    function getDadosUsuario(){
        const usuario = navigation.getParam("usuario");
        const idUsuario = navigation.getParam("userID");
        const token = navigation.getParam("token");
        return {
            usuario: usuario,
            userID: idUsuario,
            token: token
        }
    }

    const [votacoes, setVotacoes] = useState([]);
    async function loadVotacoes() {
        const votacoesAbertas = await api.get("/votacoes");
        // console.log(votacoesAbertas);
        setVotacoes(votacoesAbertas.data);
        return votacoesAbertas.data;
    }
    async function updateVotos(id, callback){
        const { userID, token } = getDadosUsuario();
        await api.put('/votar',{
            idVotacao: id,
            idUsuario: userID,
            token: token
        })
        .then(resp => {
            callback(resp);
        }).catch(err => callback(err));
    }
    useEffect(()=>{
        loadVotacoes();
    },[]);

    return (
        <>
            <FlatList
                data={votacoes}
                renderItem={({ item }) => 
                    <VoteItem 
                        autor={item.usuario.usuario}
                        titulo={item.assunto}
                        resumo={item.resumo} 
                        votos={item.votos}
                        updateVotos={updateVotos}
                        idVotacao={item.id}
                    />
                }
                keyExtractor={item => item.id+""} 
            />
        </>
    );
}

export default VotacoesAbertas;