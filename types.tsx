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

};

export enum JoyType {
  Image,
  Text,
  Music

}

export type JoyItem = {
  type:JoyType;
  text?:string;
  url?:string;
  //TODO add image
}



