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
import Eventos from './Avisos/Eventos';

interface contextSP{
  context:WebPartContext;
  modal:boolean;
  anuncio:boolean;
  onChangeContext: (isModal) => {},
}
const SeccionAvisos = (props: ISeccionAvisosProps) => {
  const {
    Title,    
    ListNameE,
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
  <h2 className={styles.textcolor}>{Title}</h2>
    {ListName == undefined ?
      <Placeholder iconName='Edit'
        iconText='Configura el webpart'
        description='Por favor configura la fuente de datos y la cantidad a mostrar'
        buttonLabel='Configurar'
        onConfigure={_onConfigure} /> :
      <SPContext.Provider value={{context:context,anuncio:false,modal:modal,onChangeContext}} >
        <Pivot aria-label="Avisos">
          <PivotItem
            headerText="Comunicados"
            headerButtonProps={{
              'data-order': 1,
              'data-title': 'Comunicados',
            }}
          >
            <Comunicados ListName={ListName} Count={Count} />
          </PivotItem>
          <PivotItem headerText="Anuncios">
            <Label styles={labelStyles}><Avisos ListName={ListNameA} Count={Count}/></Label>
          </PivotItem>
          <PivotItem headerText="Fechas Especiales">
            <Label styles={labelStyles}><Eventos ListName={ListNameE} Count={Count}/></Label>
          </PivotItem>
        </Pivot>
      </SPContext.Provider>
    }</>)
}
export default SeccionAvisos;
export const SPContext = createContext<contextSP>({context:{} as WebPartContext,anuncio:false,modal:false,onChangeContext:(isModal)=>isModal});