import { createAppContainer  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import VotacoesAbertas from './pages/votacoesabertas/VotacoesAbertas';
import Login from './pages/autenticacao/Login';
import Main from './pages/main/Main';

const Paginas = createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                headerShown: false,
            }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                headerShown: false,
            }
        },
        VotacoesAbertas: {
            screen: VotacoesAbertas,
            navigationOptions: {
                title: "Votações Abertas"
            }
        }
    },{
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7e57c2',
            }
        }
    }
);

export default createAppContainer(Paginas);