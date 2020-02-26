import React, { useState } from 'react';
import { 
    TextInput, 
    Text, 
    View, 
    TouchableOpacity, 
    Alert, 
    Image, 
    StackActions, 
    NavigationActions
 } from 'react-native';
import api from '../../services/api';
import storage from '../../services/storage';
import styles from '../autenticacao/style';
import Logo from '../../public/img/TechFriday.png';

export default function Login({ navigation }){

    const KEY_STORAGE = '@TechFriday:dadosLogin';

    const [ usuario, setUsuario ] = useState('');
    const [ senha, setSenha ] = useState('');
    
    async function logIn(){
        const resp = await api.post('/login',{
                usuario: usuario,
                senha: senha
            },{
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        if(resp!=null){
            if(resp.data.status===200){
                const dadosUsuario = {
                    userID: resp.data.userid,
                    usuario: resp.data.usuario,
                    token: resp.data.token
                }
                await storage.save(KEY_STORAGE,dadosUsuario)
                    .then(resp=>{
                        const resetNavigation = StackActions.reset({
                            index: 0,
                            key: null,
                            actions: [NavigationActions.navigate({routeName: 'VotacoesAbertas', params: dados})]
                        });
                        navigation.dispatch(resetNavigation);
                    });
            }else{
                Alert.alert("Ops...",resp.data.message);
            }
        }else{
            Alert.alert("Ops...", "Nosso serviço está indisponível no momento. Tente novamente mais tarde!");
        }
    }

    return (
        <>
            <View style={styles.fundoApp}>
                <Image source={Logo} style={styles.logoImg} />
                <TextInput
                    
                    value={usuario}
                    onChangeText={(user)=>{setUsuario(user)}}
                    placeholder="Usuário"
                    placeholderTextColor={'#757575'}
                    selectionColor="#fff"
                    underlineColorAndroid='transparent'
                    style={styles.inputForm}
                    textContentType="nickname"
                ></TextInput>
                <TextInput
                    value={senha}
                    onChangeText={(pass)=>{setSenha(pass)}}
                    placeholder="Senha"
                    secureTextEntry={true}
                    placeholderTextColor={'#757575'}
                    selectionColor="#fff"
                    underlineColorAndroid='transparent'
                    style={styles.inputForm}
                    textContentType="password"
                ></TextInput>
                <TouchableOpacity 
                    onPress={()=>{
                        logIn();
                    }}
                    style={styles.botao}
                >
                    <Text style={styles.botaoTxt}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}