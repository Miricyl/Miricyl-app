import { CategoryType, ContentType, IContentItem, Intervals, ScheduleMode } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'uuid';

//TODO change this to be just AddItem so it can serve for all types (places to distract and coping strategies )
//extract CategoryType (Joy/places/coping) for displaying on correct screen
export const AddItem = async (contentItem: IContentItem) => {
    contentItem.id = uuid.v4();
    let contentItemString = await AsyncStorage.getItem('items') as string;
    let items: IContentItem[] = []
    if (contentItemString) {

        items = JSON.parse(contentItemString) as IContentItem[];
        items.push(contentItem);

    }
    else {

        items.push(contentItem);
    }

    AsyncStorage.setItem('items', JSON.stringify(items));

    return contentItem.id;
}

export const UpdateItem = async (contentItem: IContentItem) => {
    let contentItemString = await AsyncStorage.getItem('items') as string;
    let items: IContentItem[] = []
    if (contentItemString) {

        items = JSON.parse(contentItemString) as IContentItem[];
        var index = items.findIndex((item) => item.id === contentItem.id);

        if (index !== -1) {
            items[index] = contentItem;
            AsyncStorage.setItem('items', JSON.stringify(items));
        }
    }
}

export const DeleteItem = async (contentItemId: string) => {

    let contentItemString = await AsyncStorage.getItem('items') as string;
    let items: IContentItem[] = []
    if (contentItemString) {

        items = JSON.parse(contentItemString) as IContentItem[];
        items = items.filter(function (obj) {
            return obj.id !== contentItemId;
        });

        AsyncStorage.setItem('items', JSON.stringify(items));
    }
}

export const LoadAllItems = async () => {

    let joyitemsString = await AsyncStorage.getItem('items') as string;
    let joyitems: IContentItem[] = []
    if (joyitemsString) {
        joyitems = JSON.parse(joyitemsString) as IContentItem[];

    }

    else {

        //this is to allow quick testing and development, remove before publish
        const joyItem1: IContentItem = {
            id: "1",
            text: "This is a joy item with a link",
            url: "https://www.bbc.co.uk",
            contentType: ContentType.Url,
            category: CategoryType.Love,
            active: true,
            schedulingDetails: {
                identifyer: 'erw452rw3rw3',
                day: 1,
                hour: 8,
                minute: 30,
                frequency: Intervals.Weekly,
                scheduleMode:ScheduleMode.Scheduled,
            }


        }
        const joyItem2: IContentItem = {
            id: "2",
            text: "Call my mum",
            phoneNumber: "07799416722",
            contentType: ContentType.PhoneNumber,
            category: CategoryType.Love,
            active: true,
            schedulingDetails: {
                identifyer: 'erw452rw3rw3',
                day: 1,
                hour: 8,
                minute: 30,
                frequency: Intervals.Weekly,
                scheduleMode:ScheduleMode.Scheduled,
            }


        }
        const joyItem3: IContentItem = {
            id: "3",
            text: "Act as if what you do makes a difference. It does.",
            contentType: ContentType.Text,
            category: CategoryType.Love,
            active: true,
            schedulingDetails: {
                identifyer: 'erw452rw3rw3',
                day: 1,
                hour: 8,
                minute: 30,
                frequency: Intervals.Weekly,
                scheduleMode:ScheduleMode.Scheduled,
            }


        }

        const joyItem4: IContentItem = {
            id: "4",
            text: "Me and my friends.",
            imageUri: "https://media.bloomandwild.com/v1/trim:15/2160x2160/smart/filters:format(webp)/https://assets-0.bloomandwild.com/letterbox-main/the-quinn-ht/cfe4b3bf-5e6b-4e08-a557-a0ce36704a65.jpeg",
            contentType: ContentType.Image,
            category: CategoryType.Love,
            active: true,
            schedulingDetails: {
                identifyer: 'erw452rw3rw3',
                day: 1,
                hour: 8,
                minute: 30,
                frequency: Intervals.Weekly,
                scheduleMode:ScheduleMode.Scheduled,
            }

        }

        joyitems.push(joyItem1);
        joyitems.push(joyItem2);
        joyitems.push(joyItem3);
        joyitems.push(joyItem4);
        AsyncStorage.setItem('items', JSON.stringify(joyitems));

    }

    return joyitems;
}

export const LoadItem = async (id: string) => {

    let itemsString = await AsyncStorage.getItem('items') as string;
    let items: IContentItem[] = [];
    if (itemsString) {
        items = JSON.parse(itemsString) as IContentItem[];
        let item = items.find(o => o.id === id);
        return item;

    }
    //TODO define a good example message to be present if the user hasn't added anything themselves, could even be scheduled to send them a message?
    const item: IContentItem = { id: "unknown", category: CategoryType.Love, contentType: ContentType.Text, active: false, schedulingDetails:{
        identifyer:undefined,
        minute:0,
        hour:12,
        day:2,
        frequency: Intervals.Daily,
        scheduleMode:ScheduleMode.Interval,

    }}
    return item;
}

export const LoadItemByCategory = async (categoryType: CategoryType) => {

    let itemsString = await AsyncStorage.getItem('items') as string;
    let items: IContentItem[] = [];
    if (itemsString) {
        items = JSON.parse(itemsString) as IContentItem[];
        let contentItems = items.filter(o => o.category === categoryType);
        return contentItems;
    }
    
    return items;
}

export const LoadItemOnActive = async (active: boolean) => {

    let itemsString = await AsyncStorage.getItem('items') as string;
    let items: IContentItem[] = [];
    if (itemsString) {
        items = JSON.parse(itemsString) as IContentItem[];
        let contentItems = items.filter(o => o.active=== active);
        return contentItems;
    }
    
    return items;
}