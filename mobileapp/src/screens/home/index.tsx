import { Button, View, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const HomeScreen = ({ navigation }: any) => {
    const {isLoading, logout} = useAuth();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
        <Button
          title="Logout"
          onPress={() => logout()}
        />
      </View>
    );
}

export default HomeScreen