import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DashboardScreen from '../screens/DashboardScreen';
import { DashboardParamList } from '../types';
import ContentScreen from '../screens/ContentScreen';
import JoyImportScreen from '../screens/Joy/JoyImportScreen';
import JoyScreen from '../screens/Joy/JoyScreen';
import MoodScreen from '../screens/Mood/MoodScreen';
import PlacesToDistractScreen from '../screens/PlacesToDistract/PlacesToDistractScreen';
import SelfCareScreen from '../screens/SelfCareScreen';
import SelfCheckScreen from '../screens/SelfCheck/SelfCheckScreen';
import CopingStrategiesScreen from '../screens/Strategies/CopingStrategyScreen';
import ManageWellnessMessageScreen from '../screens/WellnessMessages/ManageWellnessMessageScreen';


const Stack = createStackNavigator<DashboardParamList>();

export default function DashboardStackNavigator() {
    const colorScheme = useColorScheme();

    return (
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{ headerTitle: 'Miricyl' }} />
                <Stack.Screen
                name="SelfCare"
                component={SelfCareScreen}
                options={{ headerTitle: 'SelfCare' }}
            />
            <Stack.Screen
                name="Mood"
                component={MoodScreen}
                options={{ title: 'How are you today?' }}
            />
               <Stack.Screen
                name="SelfCheck"
                component={SelfCheckScreen}
                options={{ title: 'Self Check Up' }}
            />
             <Stack.Screen
                name="CopingStrategies"
                component={CopingStrategiesScreen}
                options={{ title: 'Coping Strategies' }}
            />
             <Stack.Screen
                name="PlacesToDistract"
                component={PlacesToDistractScreen}
                options={{ title: 'Places to Distract' }}
            />
            <Stack.Screen
                name="Joy"
                component={JoyScreen}
                options={{ title: 'Things that gives me joy' }}
            />
            <Stack.Screen
                name="JoyImport"
                component={JoyImportScreen}
                options={{ title: 'Add new item' }}
            />
            <Stack.Screen
                name="ManageWellnessMessage"
                component={ManageWellnessMessageScreen}
                options={{ title: 'Manage your Wellness messages' }}
            />
            <Stack.Screen
                name="Content"
                component={ContentScreen}
                options={{ title: '' }}
            />

            </Stack.Navigator>



    );
}
