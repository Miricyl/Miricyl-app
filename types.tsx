export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type DashboardParamList = {
  Dashboard:undefined;
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

export interface NavigationCardDetails {
  text:string;
  screenName:string;
  height?:any;
  width?:any;
}

export interface ContentCardDetails {
  text?:string;
  image?:any;
  url?:string;
  contentType:ContentType;
  height?:any;
  width?:any;
}



// export type JoyItem = {
//   type:JoyType;
//   text?:string;
//   url?:string;
//   //TODO add image
// }



