import * as React from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import {LinkType} from '../types'

const DashboardScreen = () => {
  
  return (

      <ImageBackground source={require('../assets/images/dashboard_background.png')} style={styles.background}>
        <Image style={styles.welcomeImage} source={require('../assets/images/welcomeImage.jpg')}/>
        <Text style={styles.welcomeText}>We are here for you if you need trusted guidance on accessing resources and services that can positively impact your mental health. We will guide you in finding the treatment and help you need.</Text>
        <NavigationCard text='Search Recources' screenName='' height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
        <NavigationCard text='Info &#38; Advice' screenName='' height={Layout.window.width * 0.2} width={Layout.window.width * 0.6}></NavigationCard>
        <NavigationCard text='Register for counselling' screenName='' height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
        <NavigationCard text='Self care' screenName='SelfCare' height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
      </ImageBackground>

  );
}

export default DashboardScreen;

const styles = StyleSheet.create({

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    width: '75%',
    textAlign: 'center',
    fontSize: 18,
    color:'#8b2b0f',
    marginBottom: 10,
    lineHeight: 25,
  },
  welcomeImage: {
    borderRadius: 100,
    marginBottom: 20
  }
});
