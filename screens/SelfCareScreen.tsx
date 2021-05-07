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
            <View style={styles.buttons}>
              <NavigationCard CardType='SelfCare' text='Create a Message' link='CreateAMessage' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
              <NavigationCard CardType='SelfCare' text='My Messages' link='Joy' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
              <NavigationCard CardType='SelfCare' text='My Plans' link='' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            </View> 
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
    flex: 0.6,
    backgroundColor: 'transparent',
    marginTop: 40,
    height: '20%',
    width: '70%',
    
  },
  headingSelfCare: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  paragraphSelfCare: {
    fontSize: 15,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    textAlign: 'center',
    color:'#8b2b0f',
    lineHeight: 20,
  },
  buttons: {
    flex: 1.2,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  }

});
