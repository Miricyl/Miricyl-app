import { CategoryType, ContentType, IContentItem, Intervals, Schedule, ScheduleMode, Weekday } from '../types';
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

export const UpdateSchedule = async (id: string, schedule: Schedule, active: boolean) => {
    let contentItemString = await AsyncStorage.getItem('items') as string;
    let items: IContentItem[] = []
    if (contentItemString) {

        items = JSON.parse(contentItemString) as IContentItem[];
        var index = items.findIndex((item) => item.id === id);

        if (index !== -1) {
            items[index].schedule = schedule;
            items[index].active = active;
            await AsyncStorage.setItem('items', JSON.stringify(items));
        }

        return id;
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

        //default item if no items have been added yet
        const item: IContentItem = {
            id: "1",
            title: "Welcome!",
            text: "Try creating your own message. You can decide when you would like the message sent to you by scheduling it for set day and time or at a set interval.",
            url: "",
            contentType: ContentType.Text,
            category: CategoryType.Love,
            active: false,
            schedule: {
                identifyer: undefined,
                minute: '0',
                hour: '12',
                day: Weekday.Saturday,
                deltaTime: 2,
                frequency: Intervals.Weeks,
                scheduleMode: ScheduleMode.Scheduled,
            }
        }
        items.push(item);
        await AsyncStorage.setItem('items', JSON.stringify(items));
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
        id: "unknown",
        category: CategoryType.Love,
        contentType: ContentType.Text,
        text: "Sorry, couldn't find the message you were looking for.",
        active: false,
        schedule: {
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

    return items;
}
