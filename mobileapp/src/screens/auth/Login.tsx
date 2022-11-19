import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Text, useTheme } from "@rneui/themed";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { View } from "react-native";
import Config from "../../../config";
import { AuthView } from "../../components/views";
import { useAuth } from "../../context/AuthContext";
import { useLoginMutation } from "../../generated/types";
import { AuthStackParamList } from "../../navigation/authNavigation";
import api from "../../services/api"
import { login } from "../../services/authService";

const loginaaa = async ({ email, password }: any) => {
  const baseAddress = Config.getConfig().getBackendAddress()
  const response = await api.post(`${baseAddress}/login`, {
      username: "bob1",
      password: "bob1"
  })
  console.log(response)
}

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ route, navigation }) => {
    const { theme } = useTheme();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState('')
  
    const {login: setLoggedIn} = useAuth();

    const { mutate: loginMutation } = useMutation({
      mutationFn: login,
      onSuccess: async (data: any) => {
        // Invalidate and refetch
        console.log(data)
        await Config.getConfig().setAuthToken(data.token)
        setLoggedIn()
      },
      onError: (e: any) => {
        console.log(e)
      }
    })


    const onLogin = ({username, password}: { username: string, password: string}) => {
      loginMutation({ username, password })
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
        <Button title="Sign in" onPress={() => onLogin({ username: email, password })} containerStyle={{ marginBottom: 20 }} />
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