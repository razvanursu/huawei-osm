import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import EventOptionsScreen from '../../screens/events/eventOptions/EventOptionsScreen';
import PaymentMethodsScreen from '../../screens/events/eventOptions/PaymentMethodsScreen';
import { CommonScreenParamList, Stack } from "./common"
import { FullEventFragment } from '../../generated/types';
import EditEventScreen from '../../screens/events/eventOptions/EditEventScreen';

type EventOptions = { eventId: string }
type EventOptionsScreenNames = "EventOptions" | "PaymentMethods" | "EditEvent"
export type SplashEventOptionsScreenProps<T extends string = EventOptionsScreenNames> = NativeStackScreenProps<CommonScreenParamList, T>;
export type EventOptionsScreenProps = { event: FullEventFragment } & SplashEventOptionsScreenProps;

export type EventOptionsScreenParamList = ParamListBase & {
    EventOptions: EventOptions
    PaymentMethods: EventOptions
    EditEvent: EventOptions
}

const getCommonScreens = (Stack: Stack) => {
    
  return [
    <Stack.Screen
        key="event-options-view"
        name="EventOptions"
        component={EventOptionsScreen}
        options={{ title: "", headerShown: true }}
    />,
    <Stack.Screen
        key="payment-methods-screen"
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{ title: "", headerShown: true }}
    />,
    <Stack.Screen
        key="edit-event-screen"
        name="EditEvent"
        component={EditEventScreen}
        options={{ title: "", headerShown: true }}
    />,
  ]
};

export default getCommonScreens
