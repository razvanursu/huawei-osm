import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapSearchScreen } from '../../screens/map';
import { SplashMyProfile } from '../../screens/profile';
import LeaderboardScreen from '../../screens/LeaderBoard/LeaderboardScreen';
import PricesScreen from '../../screens/Prices/PricesScreen';

export type MapStackParamList = {
  MapSearch: undefined;
  MyProfile: undefined;
  Leaderboard: undefined;
  Prices: undefined;
}

const MapStack = createNativeStackNavigator<MapStackParamList>();

const Stack = () => (
    <MapStack.Navigator screenOptions={{ animation: 'none' }} >
        {/* Add screens to home stack */}
        <MapStack.Screen name="MapSearch" component={MapSearchScreen} options={{ headerShown: false }} />
        <MapStack.Screen name="MyProfile" component={SplashMyProfile} />
        <MapStack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <MapStack.Screen name="Prices" component={PricesScreen} />
    </MapStack.Navigator>
)

export default Stack
