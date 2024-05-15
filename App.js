import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from './src/screens/DashboardScreen';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import SplashScreen from './src/screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import NotesScreen from './src/screens/NotesScreen';
import AddNotesScreen from './src/screens/AddNotesScreen';
import COLORS from './src/components/colors/colors';
import AudioScreen from './src/screens/AudioScreen';
import PhotoRoute from './src/components/PhotoRoute';
import VideoRoute from './src/components/VideoRoute';
import AppScreen from './src/screens/AppScreen';
import SettingScreen from './src/screens/SettingScreen';

const Stack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Welcome"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={AppScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Videos"
          component={VideoRoute}
          options={{
            title: 'My Videos',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: COLORS.header, elevation: 0 },
            headerShown: true
          }}
        />
        <Stack.Screen
          name="Photos"
          component={PhotoRoute}
          options={{
            title: 'My Photos',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: COLORS.header, elevation: 0 },
            headerShown: true
          }}
        />
        <Stack.Screen
          name="Audios"
          component={AudioScreen}
          options={{
            title: 'AUDIO RECORDINGS',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#e87717', elevation: 0 },
            headerShown: true
          }}
        />
        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add Notes"
          component={AddNotesScreen}
          // options={{ headerShown: false }}
          options={{
            title: 'ADD NOTES',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#e87717', elevation: 0 },
            headerShown: true
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingScreen}
          // options={{ headerShown: false }}
          options={{
            title: '',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: COLORS.header, elevation: 0 },
            headerShown: true
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

