import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Dashboard: {
            screens: {
              DashboardScreen:'dashboard',
              SelfCareScreen:'self-care',
              JoyScreen: 'joy',
              JoyImportScreen:'joy-import',
              CopingStrategiesScreen:'coping-strategies',
              MoodScreen:'mood',
              PlacesToDistractScreen:'places-to-distract',
              SelfCheckScreen:'self-check',
              AddWellnessMessageScreen:'wellness-message',
              ContentScreen:'content-screen'
            },
          }
        },
      },
      NotFound: '*',
    },
  },
};
