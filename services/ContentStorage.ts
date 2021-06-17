import { CategoryType, ContentType, IContentItem, Intervals, ScheduleMode, Weekday } from '../types';
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

    await AsyncStorage.setItem('items', JSON.stringify(items));

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
            await AsyncStorage.setItem('items', JSON.stringify(items));
        }

        return contentItem.id;
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

        await AsyncStorage.setItem('items', JSON.stringify(items));
    }
}

export const LoadAllItems = async () => {

    let itemsString = await AsyncStorage.getItem('items') as string;
    let items: IContentItem[] = []
    if (itemsString) {
        items = JSON.parse(itemsString) as IContentItem[];
        items = OrderBasedOnTime(items);

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
            schedule: {
                identifyer: 'erw452rw3rw3',
                minute: '0',
                hour: '12',
                day: Weekday.Saturday,
                deltaTime: 2,
                frequency: Intervals.Weeks,
                scheduleMode: ScheduleMode.Scheduled,
            }


        }
        const joyItem2: IContentItem = {
            id: "2",
            text: "Call my mum",
            phoneNumber: "07799416722",
            contentType: ContentType.PhoneNumber,
            category: CategoryType.Love,
            active: true,
            schedule: {
                identifyer: 'erw452rw3rw3',
                minute: '0',
                hour: '12',
                day: Weekday.Saturday,
                deltaTime: 2,
                frequency: Intervals.Weeks,
                scheduleMode: ScheduleMode.Scheduled,
            }


        }
        const joyItem3: IContentItem = {
            id: "3",
            text: "Act as if what you do makes a difference. It does.",
            contentType: ContentType.Text,
            category: CategoryType.Love,
            active: true,
            schedule: {
                identifyer: 'erw452rw3rw3',
                minute: '0',
                hour: '12',
                day: Weekday.Saturday,
                deltaTime: 2,
                frequency: Intervals.Weeks,
                scheduleMode: ScheduleMode.Scheduled,
            }
        }

        const joyItem4: IContentItem = {
            id: "4",
            text: "Me and my friends.",
            imageUri: "https://media.bloomandwild.com/v1/trim:15/2160x2160/smart/filters:format(webp)/https://assets-0.bloomandwild.com/letterbox-main/the-quinn-ht/cfe4b3bf-5e6b-4e08-a557-a0ce36704a65.jpeg",
            contentType: ContentType.Image,
            category: CategoryType.Love,
            active: true,
            schedule: {
                identifyer: 'erw452rw3rw3',
                minute: '0',
                hour: '12',
                day: Weekday.Saturday,
                deltaTime: 2,
                frequency: Intervals.Days,
                scheduleMode: ScheduleMode.Interval,

            }

        }

        items.push(joyItem1);
        items.push(joyItem2);
        items.push(joyItem3);
        items.push(joyItem4);
        AsyncStorage.setItem('items', JSON.stringify(items));

    }

    return items;
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
    const item: IContentItem = {
        id: "unknown", category: CategoryType.Love, contentType: ContentType.Text, active: false, schedule: {
            identifyer: undefined,
            minute: '0',
            hour: '12',
            day: Weekday.Saturday,
            deltaTime: 2,
            frequency: Intervals.Days,
            scheduleMode: ScheduleMode.Interval,

        }
    }
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
        let contentItems = items.filter(o => o.active === active);
        return contentItems;
    }

    return items;
}

export const UpdateNotificationId = async (itemId: string, notificationId: string) => {
    let contentItemString = await AsyncStorage.getItem('items') as string;
    let items: IContentItem[] = []
    if (contentItemString) {

        items = JSON.parse(contentItemString) as IContentItem[];
        var index = items.findIndex((item) => item.id === itemId);

        if (index !== -1) {
            items[index].schedule.identifyer = notificationId;
            await AsyncStorage.setItem('items', JSON.stringify(items));
        }

        return itemId;
    }
}
export const RemoveAllSchedules = async () => {
    let contentItemString = await AsyncStorage.getItem('items') as string;
    let items: IContentItem[] = []
    if (contentItemString) {

        items = JSON.parse(contentItemString) as IContentItem[];

        for (let i = 0; i < items.length; i++) {
            items[i].active = false;
            items[i].schedule.identifyer = "";
        }


        await AsyncStorage.setItem('items', JSON.stringify(items));
    }

}

function OrderBasedOnTime(items: IContentItem[]): IContentItem[] {
    items.sort(function (a, b) {
        return b.active.valueOf().toString().localeCompare(a.active.valueOf().toString()) || b.schedule.scheduleMode.localeCompare(a.schedule.scheduleMode) || parseInt(a.schedule.day) - parseInt(b.schedule.day) || parseInt(a.schedule.hour) - parseInt(b.schedule.hour);
    });

    console.log(items)

    return items;
}
