import { AndroidNotificationPriority } from "expo-notifications";
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  Content: { contentId: string };
  Category: { category: CategoryType, contentId?:string }
  NotFound: undefined;
};

export type ContentProps = StackScreenProps<RootStackParamList, 'Content'>;
export type CategoryProps = StackScreenProps<RootStackParamList, 'Category'>;

export type DashboardParamList = {
  Dashboard: undefined;
  SelfCare: undefined;
  MyMessages: undefined;
  ContentImport: undefined;
  CopingStrategies: undefined;
  Mood: undefined;
  SelfCheck: undefined;
  ManageWellnessMessage: undefined;
  PlacesToDistract: undefined;
  Content: undefined;
  CreateAMessage: undefined;
  CreateMessage: undefined;
  Scheduling: undefined;
  FeatureNotAvailable: undefined;
};



export enum ContentType {
  Undefined,
  PhoneNumber,
  Text,
  Url,
  Image

}

export type ContentSelect = {
  label: string;
  value: ContentType;

}

export enum LinkType {
  Screen,
  Url
}

export enum CategoryType {
  Undefined,
  Love,
  Places,
  Coping,
  StayingWell,
  EarlyWarning
}

export interface INavigationCardDetails {
  CardType?: string,
  text: string;
  children?:JSX.Element;
  link: any;
  linkType: LinkType;
  height?: any;
  width?: any;
  category?: CategoryType;
}

export interface IContentItem {
  id: string;
  contentType: ContentType;
  title?: string;
  text?: string;
  url?: string;
  imageUri?: string;
  phoneNumber?: string;
  category: CategoryType;
  schedule: Schedule;
  active: boolean;

}

export type Schedule = {
  identifyer: string|undefined; //comes from expo server at scheduling of the notification
  day: Weekday; 
  hour: string;
  minute: string;
  deltaTime:number;
  frequency: Intervals;
  scheduleMode:ScheduleMode;
}

export enum Intervals {
  Minutes="Minutes",
  Hours="Hours",
  Days="Days",
  Weeks="Weeks",
  Months="Months"
}

export enum ScheduleMode {
  Scheduled="Scheduled",
  Interval="Interval"
}

export enum Weekday {
  Undefined='',
  Sunday='Sunday',
  Monday='Monday',
  Tuesday='Tuesday',
  Wednesday='Wednesday',
  Thursday='Thursday',
  Friday='Friday',
  Saturday='Saturday',
}

export interface IInputFieldDetails {
  placeholder: string;
  lines: number;
  height: any;
  width: any;
  onChangeText(value: string): any;
  value: string;
}

export interface ISelectionButtonDetails {
  onPressFunction(): any;
  text: string;

}
