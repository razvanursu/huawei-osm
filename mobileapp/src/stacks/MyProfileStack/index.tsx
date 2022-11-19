import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashProfile } from '../../screens/profile';
import EditProfileScreen from '../../screens/profile/EditProfileScreen';
import { Follower, Profile } from '../../models/user';
import FollowersListScreen, { FollowerScreenTabs } from '../../screens/profile/FollowersListScreen';
import { CommonScreenParamList, getCommonScreens } from '../common/common';
import SplashMyProfile from '../../screens/profile/SplashMyProfile';
import { Icon } from '@rneui/themed';
import SettingsScreen from '../../screens/settings/SettingsScreen';

export type MyProfileStackParamList = CommonScreenParamList & {
  MyProfile: undefined;
  Settings: undefined;
}

const MyProfileStack = createNativeStackNavigator<MyProfileStackParamList>();
const common = getCommonScreens(MyProfileStack)

const Stack = () => (
    <MyProfileStack.Navigator screenOptions={{ animation: 'none' }}>
        <MyProfileStack.Screen
          name="MyProfile"
          component={SplashMyProfile}
        />
        <MyProfileStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings", headerShown: true }}
        />
        {common}
    </MyProfileStack.Navigator>
)

export default Stack
