import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';

const SelfCareScreen = () => {

  return (
    <View style={styles.container}>
      <NavigationCard text='How do you feel?' screenName='Mood' height={Layout.window.width * 0.2} width={Layout.window.width * 0.75}></NavigationCard>
      <View style={styles.cardRow}>
        <NavigationCard text='Self check up' screenName='SelfCheck' height={Layout.window.width * 0.25} width={Layout.window.width * 0.25}></NavigationCard>
        <NavigationCard text='Coping Strategies' screenName='CopingStrategies' height={Layout.window.width * 0.25} width={Layout.window.width * 0.25}></NavigationCard>
      </View>
      <View style={styles.cardRow}>
        <NavigationCard text='Places to distract' screenName='PlacesToDistract' height={Layout.window.width * 0.25} width={Layout.window.width * 0.25}></NavigationCard>
        <NavigationCard text='Things that bring me joy' screenName='Joy' height={Layout.window.width * 0.25} width={Layout.window.width * 0.25}></NavigationCard>
      </View>
      <NavigationCard text='Manage your wellness messages' screenName='ManageWellnessMessage' height={Layout.window.width * 0.1} width={Layout.window.width * 0.8}></NavigationCard>
    </View>
 
  );
}

export default SelfCareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  cardRow: {
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  }
});
