import React, {createContext, useState, useContext} from 'react';
import jwt_decode from "jwt-decode";
import Config from '../../config';

interface AuthContextData {
    login: () => {};
    logout: () => {};
    isLoading: boolean;
    isLoggedIn: boolean;
    username?: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({children}: any) => {
  //The loading part will be explained in the persist step session
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState<string | undefined>();

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      var username;
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        token = await Config.getConfig().getAuthToken()
    
        if(token) {
          var decodedToken = jwt_decode(token) as Record<string, string>
          username = decodedToken.username
        }

      } catch (e) {
        // Restoring token failed
        console.log(e)
      }


      setUsername(username)
      setIsLoading(false)
      //setIsLoggedIn(Boolean(token) && Boolean(refreshToken) && Boolean(userID))
      setIsLoggedIn(Boolean(token) && Boolean(username))
    };

    bootstrapAsync();
  }, []);


  const login = async () => {
    setIsLoading(false)
    setIsLoggedIn(true)
  };

  const logout = async () => {
    Config.getConfig().deleteAuthToken()
    setIsLoading(false)
    setIsLoggedIn(false)
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{isLoading, isLoggedIn, login, logout, username}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
}

export { AuthContext, AuthProvider }