import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateEventScreen } from '../../screens/createEvent';
import { SplashEventScreen } from '../../screens/events';
  
export type CreateEventStackParamList = {
    Create: undefined;
    Event: {
      eventId?: string
    };
}

const CreateEventStack = createNativeStackNavigator<CreateEventStackParamList>();

const Stack = () => (
    <CreateEventStack.Navigator screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
        {/* Add screens to home stack */}
        <CreateEventStack.Screen
            name="Create"
            component={CreateEventScreen}
            options={{ title: "Create Event", headerShown: true }}
        />
        <CreateEventStack.Screen name="Event" component={SplashEventScreen} options={{ title: "", headerShown: true }} />
    </CreateEventStack.Navigator>
)

export default Stack
