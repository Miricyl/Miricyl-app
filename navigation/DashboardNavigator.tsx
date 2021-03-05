import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DashboardScreen from '../screens/DashboardScreen';
import JoyScreen from '../screens/Joy/JoyScreen';
import JoyImportScreen from '../screens/Joy/JoyImportScreen';
import { DashboardParamList} from '../types';

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
                name="Joy"
                component={JoyScreen}
                options={{ title: 'Things that gives me joy' }}
            />
            <DashboardStack.Screen
                name="JoyImport"
                component={JoyImportScreen}
                options={{ title: 'Add new item' }}
            />
        </DashboardStack.Navigator>

    );
}
