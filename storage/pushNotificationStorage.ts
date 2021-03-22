import * as SecureStore from 'expo-secure-store';

export const StorePushToken = async (pushToken: string) => {
    const token = JSON.stringify(pushToken)
    await SecureStore.setItemAsync('pushToken', token);
}
