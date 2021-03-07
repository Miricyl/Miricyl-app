import AsyncStorage from '@react-native-community/async-storage';
import { IJoyItem } from '../types';

export const AddJoyItems = async (joyItem: IJoyItem) => {

    let joyitemsString = await AsyncStorage.getItem('joyitems') as string;
    let joyitems: IJoyItem[] = []
    if (joyitemsString) {
  
        joyitems = JSON.parse(joyitemsString) as IJoyItem[];
        joyitems.push(joyItem);

    }
    else {

        joyitems.push(joyItem);
    }

    AsyncStorage.setItem('joyitems', JSON.stringify(joyitems));
}


export const LoadJoyItems = async () => {

    let joyitemsString = await AsyncStorage.getItem('joyitems') as string;
    let joyitems: IJoyItem[] = []
    if (joyitemsString) {
        console.log(joyitemsString);
        joyitems = JSON.parse(joyitemsString) as IJoyItem[];


    }
  
    return joyitems;
}
