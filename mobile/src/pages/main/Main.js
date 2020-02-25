import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, ScrollView } from 'react-native';
import api from '../../services/api';
import Item from './Item';

function Main() {
    const [votacoes, setVotacoes] = useState([]);
    async function loadVotacoes() {
        const votacoesAbertas = await api.get("/votacoes");
        // console.log(votacoesAbertas);
        setVotacoes(votacoesAbertas.data);
        return votacoesAbertas.data;
    }
    async function updateVotos(id, callback){
        await api.put('/votar',{idVotacao: id})
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
                    <Item 
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

export default Main;