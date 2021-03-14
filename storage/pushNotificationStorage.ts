import * as SecureStore from 'expo-secure-store';

export const StorePushToken = async (pushToken: string) => {

    await SecureStore.setItemAsync('pushToken', pushToken);
}
