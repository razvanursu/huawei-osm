import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import AuthNavigation from './src/navigation/authNavigation';
import Navigation from './src/navigation/navigation';
import { SplashScreen } from './src/screens/splash';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider } from '@rneui/themed';
import theme from './src/theme/light';

import './src/constants/IMLocalize';
import Config from './config';
import { SafeAreaView } from 'react-native';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, Observable, FetchResult, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql';
import { refreshToken } from './src/utils/utils';
import { RestLink } from 'apollo-link-rest';
import { createUploadLink } from 'apollo-upload-client';
import StoriesStack from './src/stacks/StoriesStack';
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