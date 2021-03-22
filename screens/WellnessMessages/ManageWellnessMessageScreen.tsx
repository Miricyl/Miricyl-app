import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import AddButton from '../../components/AddButton';
import * as Notifications from 'expo-notifications';
import { Text, View } from '../../components/Themed';

export default function ManageWellnessMessagesScreen() {
  const [title, setTitle] = useState<String>("Message");
  const [text,setText]= useState<string>("This is the message");
  const [url, setUrl]=useState<String>('https://miricyl.org');
 
const scheduleMessage = async () =>{
  console.log('scheduling');
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "🌻🌻🌻🌻🌻",
          body: text,
          data: { url: url },
        },
        trigger: { seconds: 2 },
      });
      console.log(id);
    }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Wellness message</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
     <AddButton onPress={scheduleMessage}>Schedule Message</AddButton>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});