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
  const httpLink = createHttpLink({
    uri: Config.getConfig().getBackendAddress() + "/graphql",
  });

  const uploadLink = createUploadLink({
    uri: Config.getConfig().getBackendAddress() + "/graphql",
    credentials: "include"
  })
  
  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await Config.getConfig().getAuthToken()
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const restLink = new RestLink({ uri: Config.getConfig().getBackendAddress() });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        console.log(graphQLErrors, networkError, operation)
        for (let err of [...(graphQLErrors || []), ...(networkError?[networkError]:[])]) {
          switch (err.message) {
            case 'Response not successful: Received status code 403':
            case 'Signature has expired':
              // ignore 401 error for a refresh request
              if (operation.operationName === 'refreshToken') return;
  
              const observable = new Observable<FetchResult<Record<string, any>>>(
                (observer) => {
                  // used an annonymous function for using an async function
                  (async () => {
                    try {
                      const accessToken = await refreshToken();
  
                      if (!accessToken) {
                        await Config.getConfig().deleteAuthToken()
                        throw new GraphQLError('Empty RefreshToken');
                      }

                      await Config.getConfig().setAuthToken(accessToken)
  
                      // Retry the failed request
                      const subscriber = {
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                      };
  
                      forward(operation).subscribe(subscriber);
                    } catch (err) {
                      observer.error(err);
                    }
                  })();
                }
              );
  
              return observable;
          }
        }
      if (networkError) {
        console.log(`[Network error]: ${networkError.message}`);
      }
    }
  );

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, restLink, uploadLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      }
    }
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
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