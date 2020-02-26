import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from '../pages/votacoesabertas/style';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

export default function Item(props){

    const [ votos, setVotos ] = useState(props.votos);
    const [ iconName, setIconName] = useState('heart-o');
    const [ heartStatus, setHeartStatus] = useState(false);

    useEffect(()=>{
        if(votos>props.votos){
            props.updateVotos(props.idVotacao, (resp)=>{
                if(resp==null||resp.status==null||resp.status!=200){
                    setVotos(votos-1);
                    setIconName('heart-o');
                    Alert.alert("Ops...","Houve um erro ao registrar o seu voto. Tente novamente mais tarde!");
                }
            });
        }
    },[votos]);

    return (
        <>
            <View style={styles.item}>
                <Text style={styles.autor}>{props.autor}</Text>
                <Text style={styles.titulo}>{props.titulo}</Text>
                <Text style={styles.resumo}>{props.resumo}</Text>
                <TouchableOpacity style={styles.votar}
                    disabled={heartStatus}
                    activeOpacity={1}
                    onPress={()=>{
                        setHeartStatus(true);
                        setVotos(votos+1);
                        setIconName('heart');
                    }} >
                    <Text style={styles.votos}>{votos}</Text>
                    <Icon name={iconName} size={16} style={styles.heart} />
                </TouchableOpacity>
            </View>
        </>
    );
}
