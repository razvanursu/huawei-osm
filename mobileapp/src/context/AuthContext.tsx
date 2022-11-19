import React, {createContext, useState, useContext} from 'react';
import jwt_decode from "jwt-decode";
import Config from '../../config';

interface AuthContextData {
    login: () => {};
    logout: () => {};
    isLoading: boolean;
    isLoggedIn: boolean;
    userID?: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({children}: any) => {
  //The loading part will be explained in the persist step session
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userID, setUserID] = useState<string | undefined>();

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token, refreshToken;

      var userID;
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        token = await Config.getConfig().getAuthToken()
        refreshToken = await Config.getConfig().getRefreshToken()
    
        if(token) {
          var decodedToken = jwt_decode(token) as Record<string, string>
          userID = decodedToken.userId
        }

      } catch (e) {
        // Restoring token failed
        console.log("HERE", e)
      }


      setUserID(userID)
      setIsLoading(false)
      //setIsLoggedIn(Boolean(token) && Boolean(refreshToken) && Boolean(userID))
      setIsLoggedIn(Boolean(token) && Boolean(userID))
    };

    bootstrapAsync();
  }, []);


  const login = async () => {
    setIsLoading(false)
    setIsLoggedIn(true)
  };

  const logout = async () => {
    Config.getConfig().deleteAuthToken()
    Config.getConfig().deleteRefreshToken()
    setIsLoading(false)
    setIsLoggedIn(false)
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{isLoading, isLoggedIn, login, logout, userID}}>
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