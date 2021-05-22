import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DashboardScreen from '../screens/DashboardScreen';
import { DashboardParamList } from '../types';
import ContentScreen from '../screens/MyMessages/ContentScreen';
import MyMessagesScreen from '../screens/MyMessages/MyMessagesScreen';
import SelfCareScreen from '../screens/SelfCareScreen';
import SelectCategoryScreen from '../screens/CreateAMessage/SelectCategoryScreen';
import CreateMessageScreen from '../screens/CreateAMessage/CreateMessageScreen';
import ScheduleMessageScreen from '../screens/ScheduleMessageScreen';


const Stack = createStackNavigator<DashboardParamList>();

export default function DashboardStackNavigator() {
    const colorScheme = useColorScheme();

    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.light.primary,
                    height: 100,
                },
                headerTintColor: Colors.light.text,
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: '800',
                }
            }}
        >

            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    title: 'Miricyl',
                }}
            />

            <Stack.Screen
                name="SelfCare"
                component={SelfCareScreen}
                options={{ headerTitle: 'SelfCare' }}
            />
            <Stack.Screen
                name="CreateAMessage"
                component={SelectCategoryScreen}
                options={{ title: 'Select Message Category' }}
            />

            <Stack.Screen
                name="MyMessages"
                component={MyMessagesScreen}
                options={{ title: 'My Messages' }}
            />

            <Stack.Screen
                name="CreateMessage"
                component={CreateMessageScreen}
                options={{ title: 'Add new message' }}
            />

            <Stack.Screen
                name="Content"
                component={ContentScreen}
                options={{ title: 'ContentScreen' }}
            />
            <Stack.Screen
                name="Scheduling"
                component={ScheduleMessageScreen}
                options={{ title: 'Schedule Message' }}
            />

        </Stack.Navigator>
    );
}


