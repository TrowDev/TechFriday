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
    }
    loadVotacoes();
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
                    />
                }
                keyExtractor={item => item.id} 
            />
        </>
    );
}

export default Main;