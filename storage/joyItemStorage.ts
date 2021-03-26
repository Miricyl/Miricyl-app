import AsyncStorage from '@react-native-community/async-storage';
import { ContentType, IContentItem } from '../types';

export const AddJoyItems = async (joyItem: IContentItem) => {

    let joyitemsString = await AsyncStorage.getItem('joyitems') as string;
    let joyitems: IContentItem[] = []
    if (joyitemsString) {
  
        joyitems = JSON.parse(joyitemsString) as IContentItem[];
        joyitems.push(joyItem);

    }
    else {

        joyitems.push(joyItem);
    }

    AsyncStorage.setItem('joyitems', JSON.stringify(joyitems));
}


export const LoadJoyItems = async () => {

    let joyitemsString = await AsyncStorage.getItem('joyitems') as string;
    let joyitems: IContentItem[] = []
    if (joyitemsString) {
        console.log(joyitemsString);
        joyitems = JSON.parse(joyitemsString) as IContentItem[];


    }

    else {

        //this is to allow quick testing and development, remove before publish
        const joyItem1:IContentItem = {
            text:"This is a joy item with a link",
            url:"https://google.com",
            type:ContentType.Url
        }
        const joyItem2:IContentItem ={
            text:"This is a joy item with a phone number",
            phoneNumber:"07799416722",
            type:ContentType.PhoneNumber

        }

        joyitems.push(joyItem1);
        joyitems.push(joyItem2);

    }
  
    return joyitems;
}
