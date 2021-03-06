import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DashboardScreen from '../screens/DashboardScreen';
import JoyScreen from '../screens/Joy/JoyScreen';
import JoyImportScreen from '../screens/Joy/JoyImportScreen';
import { DashboardParamList} from '../types';
import CopingStrategiesScreen from '../screens/Strategies/CopingStrategyScreen';
import MoodScreen from '../screens/Mood/MoodScreen';
import PlacesToDistractScreen from '../screens/PlacesToDistract/PlacesToDistractScreen';
import SelfCheckScreen from '../screens/SelfCheck/SelfCheckScreen';
import ManageWellnessMessageScreen from '../screens/WellnessMessages/ManageWellnessMessageScreen';

const DashboardStack = createStackNavigator<DashboardParamList>();

export default function DashboardNavigator() {
    const colorScheme = useColorScheme();

    return (
        <DashboardStack.Navigator initialRouteName="Dashboard">
            <DashboardStack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ headerTitle: 'Dashboard' }}
            />
            <DashboardStack.Screen
                name="Mood"
                component={MoodScreen}
                options={{ title: 'How are you today?' }}
            />
               <DashboardStack.Screen
                name="SelfCheck"
                component={SelfCheckScreen}
                options={{ title: 'Self Check Up' }}
            />
             <DashboardStack.Screen
                name="CopingStrategies"
                component={CopingStrategiesScreen}
                options={{ title: 'Coping Strategies' }}
            />
             <DashboardStack.Screen
                name="PlacesToDistract"
                component={PlacesToDistractScreen}
                options={{ title: 'Places to Distract' }}
            />
            <DashboardStack.Screen
                name="Joy"
                component={JoyScreen}
                options={{ title: 'Things that gives me joy' }}
            />
            <DashboardStack.Screen
                name="JoyImport"
                component={JoyImportScreen}
                options={{ title: 'Add new item' }}
            />
              <DashboardStack.Screen
                name="ManageWellnessMessage"
                component={ManageWellnessMessageScreen}
                options={{ title: 'Manage your Wellness messages' }}
            />
        </DashboardStack.Navigator>

    );
}
