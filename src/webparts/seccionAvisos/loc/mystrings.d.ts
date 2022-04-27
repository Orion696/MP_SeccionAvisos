declare interface ISeccionAvisosWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  ListNameFieldLabel: string;
  ListNameAFieldLabel: string;
  ListNameEFieldLabel: string;
  TitleFieldLabel: string;
  CantidadFieldLabel:string;
}

declare module 'SeccionAvisosWebPartStrings' {
  const strings: ISeccionAvisosWebPartStrings;
  export = strings;
}
