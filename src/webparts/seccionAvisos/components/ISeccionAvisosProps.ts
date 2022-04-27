import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DefaultPalette, IStackStyles, IStackTokens } from "office-ui-fabric-react";

export interface ISeccionAvisosProps {
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context:WebPartContext;
  Title:string;
  ListName:string;
  ListNameA:string;
  ListNameE:string;
  Count:string;
}


const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
  },
};
const verticalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};