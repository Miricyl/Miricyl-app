import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { IContentItem, Intervals, Schedule, Weekday } from '../types';

export const StorePushToken = async (pushToken: string) => {
    const token = JSON.stringify(pushToken)
    await SecureStore.setItemAsync('pushToken', token);
}

export const CancelNotification = async (id: string) => {
    await Notifications.cancelScheduledNotificationAsync(id);
}


export const ScheduleScheduledNotification = async (contentItem: IContentItem, schedule: Schedule) => {
    if (contentItem != undefined) {
        //if notificationId isn't null the old notification needs to be unscheduled first.
        if (contentItem?.schedule.identifyer !== undefined || contentItem?.schedule.identifyer === "") {
            const result = await Notifications.cancelScheduledNotificationAsync(contentItem.schedule.identifyer);
        }

        let notificationId;
        const weekdays = Object.values(Weekday)
        const dayNumber = weekdays.indexOf(schedule.day);
        var startDate = new Date();

        notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "A reminder",
                body: contentItem?.title,
                data: { id: contentItem?.id },
            },
            //this is the weekly repeating one. Use later when id is saved so it can be cancelled
            //trigger: { repeats: true, weekday:day, hour: time.getHours(), minute: time.getMinutes() },

            trigger: { repeats: false, weekday: dayNumber, hour: Number(schedule.hour), minute: Number(schedule.minute) },
        });

        return notificationId;
    }
}
export const ScheduleIntervalNotification = async (contentItem: IContentItem, schedule: Schedule) => {
    if (contentItem != undefined) {
        let multiplier = 60; //corresponds to minute
        let interval = schedule.frequency;
        switch (interval) {
            case Intervals.Minutes:
                multiplier = 60;
                break;
            case Intervals.Hours:
                multiplier = 60 * 60;
                break;
            case Intervals.Days:
                multiplier = 60 * 60 * 24;
                break;
            case Intervals.Weeks:
                multiplier = 60 * 60 * 24 * 7;
                break;
            case Intervals.Months:
                multiplier = 60 * 60 * 24 * 7 * 30;
                break;
            default:
                multiplier = 60;
                break;

        }

        const seconds = schedule.deltaTime * multiplier;
        let notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "A reminder",
                body: contentItem.title,
                data: { id: contentItem.id },
            },
            //this is the weekly repeating one. Use later when id is saved so it can be cancelled
            //trigger: { repeats: true, weekday:day, hour: time.getHours(), minute: time.getMinutes() },
            trigger: {
                seconds: seconds,
                repeats: false
            }, //change to true for deployment
        });

        return notificationId;
    }
}