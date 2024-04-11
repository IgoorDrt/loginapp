import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Login'}}/>
                <Stack.Screen name="HomeScreen" component={ HomeScreen } options={{ title: 'Inicial' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
