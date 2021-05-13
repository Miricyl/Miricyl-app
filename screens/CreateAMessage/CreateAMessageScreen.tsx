import * as React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../../components/NavigationCard';
import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import { CategoryType, LinkType } from '../../types';

const CreateAMessageScreen = () => {

  return (
    <View style={styles.screen}>
      <ScrollView>
        <ImageBackground source={require('../../assets/images/dashboard_background.png')} style={styles.background}>
            {/* <NavigationCard CardType="CreateAMessage" text='How are you today?' subheading="" link='Mood' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard> */}
            <NavigationCard CardType="CreateAMessage" text='Staying Well Messages' subheading="Create reminders and see community favourites" link='ContentImport' linkType={LinkType.Screen} category={CategoryType.StayingWell} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType="CreateAMessage" text='Early Warning Signs' subheading="Keep track of your behaviours to keep your health in check" link="CreateQuote"  linkType={LinkType.Screen} category={CategoryType.EarlyWarning} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType="CreateAMessage" text='Places to Go' subheading="Need a break? Get some fresh air and visit these local areas" link="CreateQuote"  linkType={LinkType.Screen} category={CategoryType.Places} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType="CreateAMessage" text='Things I love' subheading="Remember all the little things that make living great!" link="CreateQuote"  linkType={LinkType.Screen} category={CategoryType.Love} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType="CreateAMessage" text='Coping strategies'  link='ContentImport' linkType={LinkType.Screen} category={CategoryType.Coping} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
        </ImageBackground>
      </ScrollView>
    </View>

  );
}

export default CreateAMessageScreen;

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