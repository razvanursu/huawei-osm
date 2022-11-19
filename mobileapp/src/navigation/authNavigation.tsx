import * as React from 'react';
import LoginScreen from '../screens/auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen } from '../screens/auth';

export type AuthStackParamList = {
    Login: {
        registerSuccess?: boolean;
    } | undefined;
    Register: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen
              name="Login"
              component={LoginScreen}
          />
          <Stack.Screen
              name="Register"
              component={RegisterScreen}
          />
        </Stack.Navigator>
    );
}

export default Navigation