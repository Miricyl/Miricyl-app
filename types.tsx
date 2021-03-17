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
  Image,
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

export interface IContentCardDetails {
  text?:string;
  image?:any;
  url?:string;
  contentType:ContentType;
  height?:any;
  width?:any;
}

export interface IJoyItem {
  type: ContentType;
  text?: string;
  url?: string;
  //TODO add image
}



