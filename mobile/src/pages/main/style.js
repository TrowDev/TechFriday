import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fundoApp:{
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    logoImg: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
    loadingGif: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    }
});

export default styles;