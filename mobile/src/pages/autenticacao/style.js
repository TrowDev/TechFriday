import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fundoApp:{
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    logoImg: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginTop: -200
    },
    inputForm: {
        width: 250,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'white',
        color: '#000'
    },
    botao: {
        backgroundColor: '#8e24aa',
        width: 250,
        height: 40,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    botaoTxt: {
        color: '#fff',
        fontWeight: "bold",
        alignItems: 'center',
        alignContent: 'center'
    }
});

export default styles;