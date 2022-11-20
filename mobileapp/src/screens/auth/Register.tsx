import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Text, useTheme } from "@rneui/themed";
import { AxiosError } from "axios";
import React from "react";
import { View } from "react-native";
import Config from "../../../config";
import { AuthView } from "../../components/views";
import { useAuth } from "../../context/AuthContext";
import { AuthStackParamList } from "../../navigation/authNavigation";
import { login, register, RegisterParameters } from "../../services/authService";

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
    const { theme } = useTheme();

    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState('')
    
    const onRegister = (params: RegisterParameters) => {
      //TODO: add real birthday with date picker
      params.birthday = new Date()

      register(params)
          .then((response) => {
            navigation.navigate("Login", { registerSuccess: true })
          })
          .catch((error: AxiosError) => {
            navigation.navigate("Login", { registerSuccess: true })
            //console.log(error)
            //if(error.response?.status === 401) setError("Wrong credentials")
            //else setError("An error occured")
          })
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
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
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
        <Button
          title="Register"
          //onPress={() => onRegister({email, username, name, birthday: new Date(), password})}
          containerStyle={{ marginBottom: 20 }}
        />

        {error && (
          <View style={{ backgroundColor: theme.colors.error, marginBottom: 20 }}>
            <Text>{error}</Text>
          </View>
        )}

        <View style={{ justifyContent: 'center', flexDirection: "row" }}>
          <Text style={{ textAlign: "center", color: "red" }} onPress={() => navigation.navigate('Login')}>Go back to login</Text>
        </View>
      </AuthView>
    );
}

export default RegisterScreen