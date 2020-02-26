import React from 'react';
import { View, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import storage from '../../services/storage';
import styles from './style';
import Logo from '../../public/img/TechFriday.png';
import Loading from '../../public/gifs/loading.gif';

export default function Main({ navigation }){
    
    const KEY_STORAGE = '@TechFriday:dadosLogin';

    async function isLogged(){
        return await storage.get(KEY_STORAGE).then(ret => ret!==null);
    }

    async function getLoginInfo(){
        const retorno = await storage.get(KEY_STORAGE).then(ret => {
            return ret;
        });
        return retorno;
    }

    async function loadPage(){
        const logado = await isLogged();
        if(logado){
            const dados = await getLoginInfo();
            const resetNavigation = StackActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({routeName: 'VotacoesAbertas', params: {
                    usuario: dados.usuario,
                    userID: dados.userID,
                    token: dados.token
                }})]
            });
            navigation.dispatch(resetNavigation);
        } else {
            const resetNavigation = StackActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({routeName: 'Login'})],
            });
            navigation.dispatch(resetNavigation);
        }
    }

    // loadPage();

    setTimeout(()=>{
        loadPage();
    },4000);

    return (
        <>
            <View style={styles.fundoApp}>
                <Image source={Logo} style={styles.logoImg} />
                <Image source={Loading} style={styles.loadingGif} />
            </View>
        </>
    );

}