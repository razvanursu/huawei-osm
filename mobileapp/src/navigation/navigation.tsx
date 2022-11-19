import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "@rneui/themed";
import HomeStack from '../stacks/HomeStack';
import ProfileStack from '../stacks/MyProfileStack';
import CreateEventStack from '../stacks/CreateEventStack';
import MapStack from '../stacks/MapStack';
import MyEventsStack from '../stacks/MyEventsStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoriesStack from '../stacks/StoriesStack';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Home"
            options={{
              tabBarLabel: '',
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          >
            {() => <HomeStack />}
          </Tab.Screen>
          <Tab.Screen
            name="Map"
            options={{
              tabBarLabel: '',
              tabBarIcon: ({ color, size }) => (
                <Icon name="map" color={color} size={size} />
              ),
            }}
          >
            {() => <MapStack />}
          </Tab.Screen>
          <Tab.Screen
            name="CreateEvent"
            options={{
              tabBarLabel: '',
              tabBarIcon: ({ color, size }) => (
                <Icon name="add" color={color} size={size} />
              ),
            }}
          >
            {() => <CreateEventStack />}
          </Tab.Screen>
          <Tab.Screen
            name="MyEvents"
            options={{
              tabBarLabel: '',
              tabBarIcon: ({ color, size }) => (
                <Icon name="calendar-today" color={color} size={size} />
              ),
            }}
          >
            {() => <MyEventsStack />}
          </Tab.Screen>
          <Tab.Screen
            name="Me"
            options={{
              tabBarLabel: '',
              tabBarIcon: ({ color, size }) => (
                <Icon name="account-circle" color={color} size={size} />
              ),
            }}
          >
            {() => <ProfileStack />}
          </Tab.Screen>
        </Tab.Navigator>
    );
}


const Navigation = createNativeStackNavigator()

const MainNavigation = () => (
  <Navigation.Navigator screenOptions={{ contentStyle: { backgroundColor: "white" }, headerShown: false, animation: 'none' }} >
      <Navigation.Screen
          key="tab-stack"
          name="Tabs"
          component={TabNavigation}
      />
      <Navigation.Screen
          key="stories-stack"
          name="Stories"
          component={StoriesStack}
      />
  </Navigation.Navigator>
)

export default MainNavigation