import * as SecureStore from 'expo-secure-store';
import { CategoryType, ContentType, IContentItem } from '../types';

export const AddJoyItem = async (contentItem: IContentItem) => {

    let contentItemString = await SecureStore.getItemAsync('joyitems') as string;
    let joyitems: IContentItem[] = []
    if (contentItemString) {
  
        joyitems = JSON.parse(contentItemString) as IContentItem[];
        joyitems.push(contentItem);

    }
    else {

        joyitems.push(contentItem);
    }

    SecureStore.setItemAsync('joyitems', JSON.stringify(joyitems));
}




export const LoadJoyItems = async () => {

    let joyitemsString = await SecureStore.getItemAsync('joyitems') as string;
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
            category:CategoryType.Joy
            
        }
        const joyItem2:IContentItem ={
            id:"2",
            text:"Call my mum",
            phoneNumber:"07799416722",
            contentType:ContentType.PhoneNumber,
            category:CategoryType.Joy

        }
        const joyItem3:IContentItem ={
            id:"3",
            text:"Act as if what you do makes a difference. It does.",
            contentType:ContentType.Text,
            category:CategoryType.Joy

        }

        joyitems.push(joyItem1);
        joyitems.push(joyItem2);
        joyitems.push(joyItem3);

        SecureStore.setItemAsync('joyitems', JSON.stringify(joyitems));

    }
  
    return joyitems;
}

export const LoadItem = async (id:string) => {

    let itemsString = await SecureStore.getItemAsync('joyitems') as string;
    let items: IContentItem[] = []
    if (itemsString) {
        items = JSON.parse(itemsString) as IContentItem[];
        let item = items.find(o => o.id === id);
        return item;

    }
    const item:IContentItem={id:"unknown",category:CategoryType.Joy,contentType:ContentType.Text}
    return item;
}