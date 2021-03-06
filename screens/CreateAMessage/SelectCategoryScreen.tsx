import * as React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../../components/NavigationCard';
import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import { CategoryType, LinkType } from '../../types';
import Colors from '../../constants/Colors';

const SelectCategoryScreen = () => {

  return (
    <View style={styles.screen}>
       <ScrollView contentContainerStyle={styles.ScrollViewContainer}>
       <View style={styles.navigationCards}>
            <NavigationCard CardType="rectNavCard" text='Staying Well Messages' link='CreateMessage' linkType={LinkType.Screen} category={CategoryType.StayingWell}></NavigationCard>
            <NavigationCard CardType="rectNavCard" text='Early Warning Signs' link="CreateMessage"  linkType={LinkType.Screen} category={CategoryType.EarlyWarning}></NavigationCard>
            <NavigationCard CardType="rectNavCard" text='Places to Go' link="CreateMessage"  linkType={LinkType.Screen} category={CategoryType.Places}></NavigationCard>
            <NavigationCard CardType="rectNavCard" text='Things I love' link="CreateMessage"  linkType={LinkType.Screen} category={CategoryType.Love} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            <NavigationCard CardType="rectNavCard" text='Coping strategies'  link='CreateMessage' linkType={LinkType.Screen} category={CategoryType.Coping} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
        </View>
      </ScrollView>
    </View>

  );
}

export default SelectCategoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  ScrollViewContainer: {
    backgroundColor: Colors.light.secondary,
    flex: 1,
  },
  navigationCards: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
  },
});