import * as React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { LinkType } from '../types';

const SelfCareScreen = () => {

  return (
    <View style={styles.screen}>
      <ScrollView>
        <ImageBackground source={require('../assets/images/dashboard_background.png')} style={styles.background}>

            <NavigationCard text='How do you feel?' link='Mood' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard text='Self check up' link='SelfCheck' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard text='Coping Strategies' link='CopingStrategies' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard text='Places to distract' link='PlacesToDistract' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard text='Things that bring me joy' link='Joy' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard text='Manage your wellness messages' link='ManageWellnessMessage' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>

        </ImageBackground>
      </ScrollView>
    </View>

  );
}

export default SelfCareScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,

  },

  background: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: Dimensions.get('screen').height
  },

});
