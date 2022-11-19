import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventListScreen, SplashEventScreen } from '../../screens/events';
import EventParticipantsScreen from '../../screens/events/EventParticipantsScreen';
import { CommonScreenParamList, getCommonScreens } from '../common/common';
import { ParamListBase } from '@react-navigation/native';
import HomeScreen from '../../screens/home';

export type HomeStackParamList = CommonScreenParamList & {
  EventList: undefined;
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const common = getCommonScreens(HomeStack)

const Stack = () => (
    <HomeStack.Navigator screenOptions={{ contentStyle: { backgroundColor: "white" }, headerShown: false, animation: 'none' }} >
        {/* Add screens to home stack */}
        <HomeStack.Screen name="EventList" component={EventListScreen} />
        {common}
    </HomeStack.Navigator>
)

export default Stack
