import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventListScreen, SplashEventScreen } from '../../screens/events';
import EventParticipantsScreen from '../../screens/events/EventParticipantsScreen';
import { CommonScreenParamList, getCommonScreens } from '../common/common';
import { ParamListBase } from '@react-navigation/native';
import HomeScreen from '../../screens/home';
import EventStoriesScreen from '../../screens/stories/EventStoriesScreen';

export type StoriesStackParamList = CommonScreenParamList & {
    EventStories: {
        eventId: string
    };
}

const StoriesStack = createNativeStackNavigator<StoriesStackParamList>();
const common = getCommonScreens(StoriesStack)

const Stack = () => (
    <StoriesStack.Navigator screenOptions={{ contentStyle: { backgroundColor: "white" }, headerShown: false, animation: 'none' }} >
        {/* Add screens to home stack */}
        <StoriesStack.Screen
            key="event-stories-view"
            name="EventStories"
            component={EventStoriesScreen}
        />
        {common}
    </StoriesStack.Navigator>
)

export default Stack
