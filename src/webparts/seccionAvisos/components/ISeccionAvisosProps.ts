import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DefaultPalette, IStackStyles, IStackTokens } from "office-ui-fabric-react";

export interface ISeccionAvisosProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context:WebPartContext;
  ListName:string;
  ListNameA:string;
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