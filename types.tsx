import { AndroidNotificationPriority } from "expo-notifications";
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  Content:{contentId:string};
  Category:{category:CategoryType}
  NotFound: undefined;
};

export type ContentProps = StackScreenProps<RootStackParamList, 'Content'>;
export type CategoryProps = StackScreenProps<RootStackParamList, 'Category'>;

export type DashboardParamList = {
  Dashboard:undefined;
  SelfCare:undefined;
  Joy: undefined;
  ContentImport:undefined;
  CopingStrategies:undefined;
  Mood:undefined;
  SelfCheck:undefined;
  ManageWellnessMessage:undefined;
  PlacesToDistract:undefined;
  Content:undefined;
  CreateAMessage:undefined;
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
   Undefined,
   Love,
   Places,
   Coping,
   StayingWell,
   EarlyWarning
 }

export interface INavigationCardDetails {
  CardType?:string,
  text:string;
  subheading?:string,
  link:any;
  linkType:LinkType;
  height?:any;
  width?:any;
  category?:CategoryType;
}

export interface IContentItem {
  id:string;
  contentType: ContentType;
  title?: string;
  text?: string;
  url?: string;
  imageUri?:string;
  phoneNumber?:string;
  category:CategoryType;
  schedulingDetails?:SchedulingDetails;
  active:boolean;
  
  //TODO add image

}

export type SchedulingDetails = {
  identifyer:string; //comes from expo server at scheduling of the notification
  day:number; //1 corresponds to Sunday
  hour:number;
  minute:number;
  repeats:Frequency;
}

export enum Frequency {
  Daily,
  Weekly,
}

export interface IInputFieldDetails {
  placeholder:string;
  lines:number;
  height:any;
  onChangeText(value:string):any;
  value:string;
}

export interface ISelectionButtonDetails {
  onPressFunction():any;
  text:string;

}
