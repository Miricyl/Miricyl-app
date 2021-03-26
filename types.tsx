import { AndroidNotificationPriority } from "expo-notifications";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type DashboardParamList = {
  Dashboard:undefined;
  SelfCare:undefined;
  Joy: undefined;
  JoyImport:undefined;
  CopingStrategies:undefined;
  Mood:undefined;
  SelfCheck:undefined;
  ManageWellnessMessage:undefined;
  PlacesToDistract:undefined;
  Content:undefined;
};



export enum ContentType {
  PhoneNumber,
  Text,
  Url

}

export enum LinkType {
  Screen,
  Url
}

export interface INavigationCardDetails {
  text:string;
  link:string;
  linkType:LinkType;
  height?:any;
  width?:any;
}



export interface IContentItem {
  type: ContentType;
  text?: string;
  url?: string;
  phoneNumber?:string;
  //TODO add image

}
