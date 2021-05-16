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
       <ScrollView contentContainerStyle={styles.ScrollViewContainer}>
       <View style={styles.navigationCards}>
            <NavigationCard CardType="rectNavCard" text='Staying Well Messages' link='ContentImport' linkType={LinkType.Screen} category={CategoryType.StayingWell}></NavigationCard>
            <NavigationCard CardType="rectNavCard" text='Early Warning Signs' link="CreateQuote"  linkType={LinkType.Screen} category={CategoryType.EarlyWarning}></NavigationCard>
            <NavigationCard CardType="rectNavCard" text='Places to Go' link="CreateQuote"  linkType={LinkType.Screen} category={CategoryType.Places}></NavigationCard>
            <NavigationCard CardType="rectNavCard" text='Things I love' link="CreateQuote"  linkType={LinkType.Screen} category={CategoryType.Love} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType="rectNavCard" text='Coping strategies'  link='ContentImport' linkType={LinkType.Screen} category={CategoryType.Coping} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
        </View>
      </ScrollView>
    </View>

  );
}

export default CreateAMessageScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  ScrollViewContainer: {
    backgroundColor:'rgb(162, 232, 209)',
    flex: 1,
  },
  navigationCards: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
  },
});