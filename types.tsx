import { AndroidNotificationPriority } from "expo-notifications";
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  Content:{contentId:string};
  NotFound: undefined;
};

export type Props = StackScreenProps<RootStackParamList, 'Content'>;

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
  Url,
  Image

}

export type ContentSelect = {
  label:string;
  value:ContentType;

}

export enum LinkType {
  Screen,
  Url
}

export enum CategoryType
 {
   Joy,
   Places,
   Activity
 }

export interface INavigationCardDetails {
  text:string;
  link:string;
  linkType:LinkType;
  height?:any;
  width?:any;
}



export interface IContentItem {
  id:string;
  contentType: ContentType;
  text?: string;
  url?: string;
  imageUri?:string;
  phoneNumber?:string;
  category:CategoryType;
  //TODO add image

}
