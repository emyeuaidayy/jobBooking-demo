import { createStackNavigator } from '@react-navigation/stack';
import AccountRegister from './AccountRegister';
import Main from './HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AccountRegister" component={AccountRegister} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;