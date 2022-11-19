import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashEventScreen } from '../../screens/events';
import MyEventsListScreen from '../../screens/myEvents/MyEventsListScreen';

export type MyEventsStackParamList = {
  MyEventsList: undefined;
  Event: {
    eventId?: string
  }; 
}

const MyEventsStack = createNativeStackNavigator<MyEventsStackParamList>();

const Stack = () => (
    <MyEventsStack.Navigator screenOptions={{ headerShown: false, animation: 'none' }} >
        {/* Add screens to home stack */}
        <MyEventsStack.Screen name="MyEventsList" component={MyEventsListScreen} />
        <MyEventsStack.Screen name="Event" component={SplashEventScreen} options={{ title: "", headerShown: true }} />
    </MyEventsStack.Navigator>
)

export default Stack
