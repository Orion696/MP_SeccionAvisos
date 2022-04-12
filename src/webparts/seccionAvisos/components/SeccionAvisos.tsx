import * as React from 'react';
import styles from './SeccionAvisos.module.scss';
import { ISeccionAvisosProps } from './ISeccionAvisosProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import { Placeholder } from '@pnp/spfx-controls-react';
import Comunicados from './Avisos/Comunicados';
import { useEffect, createContext } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import Avisos from './Avisos/Avisos';

interface contextSP{
  context:WebPartContext;
  modal:boolean;
  anuncio:boolean;
  onChangeContext: (isModal) => {},
}
const SeccionAvisos = (props: ISeccionAvisosProps) => {
  const {
    description,
    ListNameA,
    ListName,
    context,
    Count
  } = props;
 console.log(props);
  const [modal, setModal] = React.useState(false);
  const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 10 },
  };
  const _onConfigure = () => {
    // Context of the web part
    props.context.propertyPane.open();
  }
  function onChangeContext(modal) {
    console.log("Cambiando contexto",modal)
    setModal(!modal);
    return modal;
  }

  return (<>
  <h2 className={styles.textcolor}>Avisos</h2>
    {ListName == undefined ?
      <Placeholder iconName='Edit'
        iconText='Configura el webpart'
        description='Por favor configura la fuente de datos y la cantidad a mostrar'
        buttonLabel='Configurar'
        onConfigure={_onConfigure} /> :
      <SPContext.Provider value={{context:context,anuncio:false,modal:modal,onChangeContext}} >
        <Pivot aria-label="Basic Pivot Example">
          <PivotItem
            headerText="Comunicados"
            headerButtonProps={{
              'data-order': 1,
              'data-title': 'My Files Title',
            }}
          >
            <Comunicados ListName={ListName} Count={Count} />
          </PivotItem>
          <PivotItem headerText="Anuncios">
            <Label styles={labelStyles}><Avisos ListName={ListNameA} Count={Count}/></Label>
          </PivotItem>
          <PivotItem headerText="Fechas Especiales">
            <Label styles={labelStyles}>Pivot #3</Label>
          </PivotItem>
        </Pivot>
      </SPContext.Provider>
    }</>)
}
export default SeccionAvisos;
// export default class SeccionAvisos extends React.Component<ISeccionAvisosProps, {}> {
//   public render(): React.ReactElement<ISeccionAvisosProps> {


//     return (
//       <section className={`${styles.seccionAvisos} ${hasTeamsContext ? styles.teams : ''}`}>
//         <div className={styles.welcome}>
//           <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
//           <h2>Well done, {escape(userDisplayName)}!</h2>
//           <div>{environmentMessage}</div>
//           <div>Web part property value: <strong>{escape(description)}</strong></div>
//         </div>
//         <div>
//           <h3>Welcome to SharePoint Framework!</h3>
//           <p>
//             The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It's the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
//           </p>
//           <h4>Learn more about SPFx development:</h4>
//           <ul className={styles.links}>
//             <li><a href="https://aka.ms/spfx" target="_blank">SharePoint Framework Overview</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank">Use Microsoft Graph in your solution</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank">Build for Microsoft Teams using SharePoint Framework</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank">Publish SharePoint Framework applications to the marketplace</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank">SharePoint Framework API reference</a></li>
//             <li><a href="https://aka.ms/m365pnp" target="_blank">Microsoft 365 Developer Community</a></li>
//           </ul>
//         </div>
//       </section>
//     );
//   }
// }

export const SPContext = createContext<contextSP>({context:{} as WebPartContext,anuncio:false,modal:false,onChangeContext:(isModal)=>isModal});