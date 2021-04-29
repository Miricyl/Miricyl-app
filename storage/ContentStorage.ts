import { CategoryType, ContentType, IContentItem } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import uuid from 'uuid';

//TODO change this to be just AddItem so it can serve for all types (places to distract and coping strategies )
//extract CategoryType (Joy/places/coping) for displaying on correct screen
export const AddJoyItem = async (contentItem: IContentItem) => {
    contentItem.id=uuid.v4();
    let contentItemString = await AsyncStorage.getItem('joyitems') as string;
    let joyitems: IContentItem[] = []
    if (contentItemString) {
  
        joyitems = JSON.parse(contentItemString) as IContentItem[];
        joyitems.push(contentItem);

    }
    else {

        joyitems.push(contentItem);
    }

    AsyncStorage.setItem('joyitems', JSON.stringify(joyitems));
}




export const LoadJoyItems = async () => {

    let joyitemsString = await AsyncStorage.getItem('joyitems') as string;
    let joyitems: IContentItem[] = []
    if (joyitemsString) {
        joyitems = JSON.parse(joyitemsString) as IContentItem[];

    }

    else {

        //this is to allow quick testing and development, remove before publish
        const joyItem1:IContentItem = {
            id:"1",
            text:"This is a joy item with a link",
            url:"https://www.bbc.co.uk",
            contentType:ContentType.Url,
            category:CategoryType.Love,
            active:false

            
        }
        const joyItem2:IContentItem ={
            id:"2",
            text:"Call my mum",
            phoneNumber:"07799416722",
            contentType:ContentType.PhoneNumber,
            category:CategoryType.Love,
            active:false


        }
        const joyItem3:IContentItem ={
            id:"3",
            text:"Act as if what you do makes a difference. It does.",
            contentType:ContentType.Text,
            category:CategoryType.Love,
            active:false


        }

        const joyItem4:IContentItem ={
            id:"4",
            text:"Me and my friends.",
            imageUri:"https://media.bloomandwild.com/v1/trim:15/2160x2160/smart/filters:format(webp)/https://assets-0.bloomandwild.com/letterbox-main/the-quinn-ht/cfe4b3bf-5e6b-4e08-a557-a0ce36704a65.jpeg",
            contentType:ContentType.Image,
            category:CategoryType.Love,
            active:false

        }

        joyitems.push(joyItem1);
        joyitems.push(joyItem2);
        joyitems.push(joyItem3);
        joyitems.push(joyItem4);
        AsyncStorage.setItem('joyitems', JSON.stringify(joyitems));

    }
  
    return joyitems;
}

export const LoadItem = async (id:string) => {

    let itemsString = await AsyncStorage.getItem('joyitems') as string;
    let items: IContentItem[] = []
    if (itemsString) {
        items = JSON.parse(itemsString) as IContentItem[];
        let item = items.find(o => o.id === id);
        return item;

    }
    const item:IContentItem={id:"unknown",category:CategoryType.Love,contentType:ContentType.Text, active:false}
    return item;
}