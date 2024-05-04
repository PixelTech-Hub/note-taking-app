import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigation from './src/components/navigations/AuthNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}

