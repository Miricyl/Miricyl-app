import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { IContentItem, Intervals, Schedule, Weekday } from '../types';

const messageTitle='A Reminder...';

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
        if (contentItem?.schedule.identifyer !== undefined && contentItem?.schedule.identifyer !== "") {
            await CancelNotification(contentItem?.schedule.identifyer);
        }

        let notificationId;
        const weekdays = Object.values(Weekday)
        const dayNumber = weekdays.indexOf(schedule.day) - 1;

        // calculate number of seconds between now and when the message is scheduled for
        let startDate = new Date();
        let secondsOfDay = (startDate.getHours() * 60 * 60) + (startDate.getMinutes() * 60);

        let today = startDate.getDay();
        let deltaDays = dayNumber - today;

        let time = (parseInt(schedule.hour) * 60 * 60) + (parseInt(schedule.minute) * 60);

        if (time < secondsOfDay) {
            deltaDays = deltaDays - 1;
        }
        else {
            time = time - secondsOfDay;
        }
        if (deltaDays < 0) {
            deltaDays = 7 + deltaDays;
        }
        time = time + (deltaDays * 24 * 60 * 60);

        notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: messageTitle,
                body: contentItem?.title,
                data: {
                    id: contentItem.id, reschedule: true
                },
            },

            trigger: { seconds: time, repeats: false },
        });

        return notificationId;
    }
}
export const ScheduleIntervalNotification = async (contentItem: IContentItem, schedule: Schedule) => {
    if (contentItem != undefined) {
        //if notificationId isn't null the old notification needs to be unscheduled first.
        if (contentItem?.schedule.identifyer !== undefined && contentItem?.schedule.identifyer !== "") {
            await CancelNotification(contentItem?.schedule.identifyer);
        }

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
                title: messageTitle,
                body: contentItem.title,
                data: { id: contentItem.id, reschedule: false },
            },
            //this is the weekly repeating one. Use later when id is saved so it can be cancelled
            //trigger: { repeats: true, weekday:day, hour: time.getHours(), minute: time.getMinutes() },
            trigger: {
                seconds: seconds,
                repeats: true
            }, //change to true for deployment
        });

        return notificationId;
    }
}


export const RescheduleNotification = async (id: string, title: string) => {

    let notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: messageTitle,
            body: title,
            data: { id: id, reschedule: false },
        },
        trigger: {
            seconds: 604800, //in a weeks time
            repeats: true
        }, //change to true for deployment
    });

    return notificationId;
}

export const UnscheduleAllMessages = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
}
