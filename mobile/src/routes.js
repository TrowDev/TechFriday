import { createAppContainer  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/main/Main';

const Paginas = createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: "Votações Abertas"
            }
        }
    },
    {
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