import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashEventScreen } from '../../screens/events';
import { MapSearchScreen } from '../../screens/map';
import { SplashMyProfile, SplashProfile } from '../../screens/profile';

export type MapStackParamList = {
  MapSearch: undefined;
  MyProfile: undefined
}

const MapStack = createNativeStackNavigator<MapStackParamList>();

const Stack = () => (
    <MapStack.Navigator screenOptions={{ headerShown: false, animation: 'none' }} >
        {/* Add screens to home stack */}
        <MapStack.Screen name="MapSearch" component={MapSearchScreen} />
        <MapStack.Screen name="MyProfile" component={SplashMyProfile} />
    </MapStack.Navigator>
)

export default Stack
