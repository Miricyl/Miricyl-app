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
            <View style={styles.textSelfCare}>
                <Text style={styles.headingSelfCare}>Self Care</Text>
                <Text style={styles.paragraphSelfCare}>Practicing self-care helps maintain a healthy relationship with yourself, which you are then able to share with others. It is NOT selfish to practice self-care. When you pay a healthy amount of attention to your own mood, thoughts and feelings, you are considering the needs of others in your world too.</Text>
            </View>
            <NavigationCard CardType='SelfCare' text='How are you today?' subheading="" link='Mood' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType='SelfCare' text='Staying Well Messages' subheading="Create reminders and see community favourites" link='SelfCheck' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType='SelfCare' text='Early Warning Signs' subheading="Keep track of your behaviours to keep your health in check" link='CopingStrategies' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType='SelfCare' text='Places to Go' subheading="Need a break? Get some fresh air and visit these local areas" link='PlacesToDistract' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType='SelfCare' text='Things I love' subheading="Remember all the little things that make living great!" link='Joy' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType='SelfCare' text='Feel the Fear and Do it Anyway' subheading="" link='ManageWellnessMessage' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
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
  textSelfCare: {
    flex: 0.5,
    backgroundColor: 'transparent',
    height: '20%',
    width: '70%',
    
  },
  headingSelfCare: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  paragraphSelfCare: {
    fontSize: 10,
  },

});
