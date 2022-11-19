import { SplashEventScreen } from '../../screens/events';
import { ParamListBase, StackNavigationState, TypedNavigator } from '@react-navigation/native';
import { NativeStackNavigationEventMap, NativeStackNavigationOptions, NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import EventParticipantsScreen from '../../screens/events/EventParticipantsScreen';
import EventOptionsScreen from '../../screens/events/eventOptions/EventOptionsScreen';
import { SplashProfile } from '../../screens/profile';
import FollowersListScreen, { FollowerScreenTabs } from '../../screens/profile/FollowersListScreen';
import PaymentMethodsScreen from '../../screens/events/eventOptions/PaymentMethodsScreen';
import { EventOptionsScreenParamList } from './EventOptionScreens';
import getEventOptionsCommonScreens from './EventOptionScreens'

export type CommonScreenParamList = ParamListBase & EventOptionsScreenParamList & {
    Event: {
      eventId: string
    }
    EventParticipants: {
      eventId: string
      name?: string
      hasPermission?: boolean
    }
    Profile: {
      userId: string
    }
    FollowerList: {
      userId: string;
      name: string;
      index?: FollowerScreenTabs;
    } | undefined
    EventStories: {
      eventId: string
    }
}


export type Stack = TypedNavigator<CommonScreenParamList, StackNavigationState<CommonScreenParamList>, NativeStackNavigationOptions, NativeStackNavigationEventMap, ({ id, initialRouteName, children, screenListeners, screenOptions, ...rest }: NativeStackNavigatorProps) => JSX.Element>

export const getCommonScreens = (Stack: Stack) => {
    
  return [
    <Stack.Screen
        key="profile-view"
        name="Profile"
        component={SplashProfile}
        options={{ title: "", headerShown: true }}
    />,    
    <Stack.Screen
      key="follower-list"
      name="FollowerList"
      component={FollowersListScreen}
      options={{ title: "", headerShown: true }}
    />,
    <Stack.Screen
        key="event-view"
        name="Event"
        component={SplashEventScreen}
        options={{ title: "", headerShown: true }}
    />,
    <Stack.Screen
        key="event-participants-view"
        name="EventParticipants"
        component={EventParticipantsScreen}
        options={{ title: "", headerShown: true }}
    />,
    ...getEventOptionsCommonScreens(Stack)
  ]
};
