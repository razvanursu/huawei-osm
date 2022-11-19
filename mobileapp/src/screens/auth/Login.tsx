import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Text, useTheme } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import Config from "../../../config";
import { AuthView } from "../../components/views";
import { useAuth } from "../../context/AuthContext";
import { useLoginMutation } from "../../generated/types";
import { AuthStackParamList } from "../../navigation/authNavigation";

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ route, navigation }) => {
    const { theme } = useTheme();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState('')
  
    const {login: setLoggedIn} = useAuth();

    const [loginMutation, { data, loading, error: loginError }] = useLoginMutation({
      errorPolicy: "none",
      onCompleted: (credentials) => {
        Config.getConfig().setAuthToken(credentials.login.token)
        //credentials.tokenAuth.refreshToken && Config.getConfig().setRefreshToken(credentials.tokenAuth.refreshToken)
        setLoggedIn()
      },
      onError: (e) => {
        //console.log(e.graphQLErrors)
        setError("An error occured")
      }
    })

    console.log(loginError)

    const onLogin = ({email, password}: { email: string, password: string}) => {
      loginMutation({ variables: {email, password }})
        /*login({ email, password })
            .then((credentials) => {
                Config.getConfig().setAuthToken(credentials.access)
                Config.getConfig().setRefreshToken(credentials.re fresh)

                setLoggedIn()
            })
            .catch((error: AxiosError) => {
                if(error.response?.status === 401) setError("Wrong credentials")
                else setError("An error occured")
            })*/
    }
  
    return (
      <AuthView>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          containerStyle={{ marginBottom: 8 }}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          containerStyle={{
            marginBottom: 18
          }}
        />
        <Button title="Sign in" onPress={() => onLogin({ email, password })} containerStyle={{ marginBottom: 20 }} />
        {error && (
          <View style={{ backgroundColor: theme.colors.error, marginBottom: 20 }}>
            <Text>{error}</Text>
          </View>
        )}

        {route.params?.registerSuccess && (
          <View style={{ backgroundColor: theme.colors.success, marginBottom: 20 }}>
            <Text>You successfully registered. Confirm your email before you can login</Text>
          </View>
        )}


        <View style={{ justifyContent: 'center', flexDirection: "row" }}>
          <Text style={{ textAlign: "center", marginRight: 5 }}>Don't have an account?</Text>
          <Text style={{ textAlign: "center", color: "red" }} onPress={() => navigation.navigate('Register')}>Sign up</Text>
        </View>
      </AuthView>
    );
}

export default LoginScreen