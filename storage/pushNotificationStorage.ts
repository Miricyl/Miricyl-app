import * as SecureStore from 'expo-secure-store';

export const StorePushToken = async (pushToken: string) => {
    const token = JSON.stringify(pushToken)
    await SecureStore.setItemAsync('pushToken', token);
}

//we should have item 'notifications' here which stores the 
//contentId, notificationId and the time it is scheduled for so we can pull it out to display 
//to the user and allow them to edit and cancel notifications 
