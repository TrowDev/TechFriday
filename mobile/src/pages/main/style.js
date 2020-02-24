import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    item: {
        flex: 1,
        borderStyle: "solid",
        borderColor: '#bdbdbd',
        backgroundColor: '#fafafa',
        borderWidth: 0.4,
        padding: 20,
        marginVertical: 3,
        marginHorizontal: 6
    },
    autor:{
        fontSize: 14,
        fontWeight: "bold",
        color: '#bdbdbd'
    },
    titulo:{
        fontSize: 14,
        fontWeight: "bold"
    },
    resumo: {
        fontSize: 12,
        fontStyle: "italic"
    },
    votar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    votos: {
        color: '#000',
        fontSize: 10,
        marginRight: 5
    },
    heart: {
        color: 'red',
    }
});

export default styles;