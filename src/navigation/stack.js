import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import PeopleFavourite from '../screens/PeopleFavourite'
import utils from '../utils'

const Router = createStackNavigator({
    Home: { screen: Home },
    PeopleFavourite: {screen: PeopleFavourite},
}, {
    headerMode: "none",
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => {
        utils.setNavigation(navigation);
    }
})
export default createAppContainer(Router)