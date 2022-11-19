import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import AuthNavigation from './src/navigation/authNavigation';
import { SplashScreen } from './src/screens/splash';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider } from '@rneui/themed';
import theme from './src/theme/light';

import { SafeAreaView } from 'react-native';
import MapStack from './src/stacks/MapStack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function AuthApp() {
  const {isLoading, isLoggedIn} = useAuth();

  return (
    <NavigationContainer>
      {isLoading ? <SplashScreen /> :
        (isLoggedIn?
        <MapStack />:
        <AuthNavigation />
      )}
    </NavigationContainer>
  )
}

const QueryClientProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProviderWrapper>
        <ThemeProvider theme={theme}>
            <SafeAreaView style={{ flex: 1 }}>
              <AuthApp />
            </SafeAreaView>
          </ThemeProvider>
      </QueryClientProviderWrapper>
    </AuthProvider>
  )
}