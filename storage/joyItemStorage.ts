import AsyncStorage from '@react-native-community/async-storage';
import { IJoyItem } from '../storeTypes';

export const UpdateJoyItems = async (joyItem: IJoyItem, index: number) => {

    let joyitemsString = await AsyncStorage.getItem('joyitems') as string;
    let joyitems: IJoyItem[] = []
    if (joyitemsString) {
        joyitems = JSON.parse(joyitemsString) as IJoyItem[];
        joyitems[index] = joyItem;

    }
    else {

        joyitems[0] = joyItem;
    }

    AsyncStorage.setItem('joyitems', JSON.stringify(joyitems));
}


export const LoadJoyItems = async () => {

    let joyitemsString = await AsyncStorage.getItem('joyitems') as string;
    let joyitems: IJoyItem[] = []
    if (joyitemsString) {
        joyitems = JSON.parse(joyitemsString) as IJoyItem[];


    }
  
    return joyitems;
}
