import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashEventScreen } from '../../screens/events';
import { MapSearchScreen } from '../../screens/map';
import { SplashMyProfile, SplashProfile } from '../../screens/profile';
import LeaderboardScreen from '../../screens/LeaderBoard/LeaderboardScreen';

export type MapStackParamList = {
  MapSearch: undefined;
  MyProfile: undefined;
  Leaderboard: undefined;
}

const MapStack = createNativeStackNavigator<MapStackParamList>();

const Stack = () => (
    <MapStack.Navigator screenOptions={{ animation: 'none' }} >
        {/* Add screens to home stack */}
        <MapStack.Screen name="MapSearch" component={MapSearchScreen} options={{ headerShown: false }} />
        <MapStack.Screen name="MyProfile" component={SplashMyProfile} />
        <MapStack.Screen name="Leaderboard" component={LeaderboardScreen} />
    </MapStack.Navigator>
)

export default Stack
