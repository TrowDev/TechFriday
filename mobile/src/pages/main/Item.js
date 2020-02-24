import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

export default function Item(props){

    const [ votos, setVotos ] = useState(0);

    useEffect(()=>{
    },[votos]);
    async function votar(dados){
        console.log("====================================");
        console.log("Props: "+votos);
        // console.log(dados);
        // setVotos();
    }

    return (
        <>
            <View style={styles.item}>
                <Text style={styles.autor}>{props.autor}</Text>
                <Text style={styles.titulo}>{props.titulo}</Text>
                <Text style={styles.resumo}>{props.resumo}</Text>
                <View style={styles.votar}>
                    <Text style={styles.votos}>{votos}</Text>
                    <TouchableHighlight onPress={()=> setVotos(votos+1)} >
                        <Icon name="heart-o" size={16} style={styles.heart} />
                    </TouchableHighlight>
                </View>
            </View>
        </>
    );
}
