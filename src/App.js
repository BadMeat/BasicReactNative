import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screen/Home';
import Login from './screen/Login';
import RealTimeDatabase from './screen/firebase/RealTimeDatabase';
import RealTimeDatabaseList from './screen/firebase/RealTimeDatabaseList';
import FirebaseMessage from './screen/firebase/FirebaseMessage';
import RestauranList from './screen/geolocation/RestauranList';
import Mapse from './screen/geolocation/Mapse';
import CameraScreen from './screen/CameraScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="RealTimeDatabase"
          component={RealTimeDatabase}
          options={{ title: 'Database' }} />
        <Stack.Screen
          name="RealTimeDatabaseTable"
          component={RealTimeDatabaseList}
          options={{ title: 'RealTimeDatabaseTable' }} />
        <Stack.Screen
          name="PushNotification"
          component={FirebaseMessage}
          options={{ title: 'PushNotification' }} />
        <Stack.Screen
          name="RestauranList"
          component={RestauranList}
          options={{ title: 'Restauran' }} />
        <Stack.Screen
          name="Mapse"
          component={Mapse}
          options={{ title: 'Maps' }} />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ title: 'Camera' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;