import * as React from 'react';
import {useContext,useEffect, useState} from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { escape } from '@microsoft/sp-lodash-subset';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem, Modal, IconButton, IButtonStyles, getTheme, mergeStyleSets, FontWeights, IIconProps, IDragOptions, ContextualMenu, DefaultButton, Stack } from '@fluentui/react';
import { SPContext } from '../SeccionAvisos';
const ModalTools= (props)=>{
    console.log(props);
    const context=useContext(SPContext);
    const {data,index,onChange}=props;
    const {modal,onChangeContext}=context;
    console.log("into modal",props, context);
    const item=data[index];
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(modal);
    const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(false);
    const dragOptions = React.useMemo(
        (): IDragOptions => ({
          moveMenuItemText: 'Move',
          closeMenuItemText: 'Close',
          menu: ContextualMenu,
          keepInBounds,
        }),
        [keepInBounds],
      );
  
    function hiddeModal(){
        hideModal()
        onChangeContext(isModalOpen)
    }
    return(<>
    <Modal
        isOpen={isModalOpen}
        onDismiss={hiddeModal}
        isBlocking={false}
        containerClassName={contentStyles.container}
        dragOptions={dragOptions}
      >
        <div className={contentStyles.header}>
          <span >{item.Title}</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={hiddeModal}
          />
        </div>
        <Stack horizontal >
        <div><img  src={JSON.parse(item.FotoDelComunicado).serverRelativeUrl}/></div>
        <div className={contentStyles.body}>
       <p>{escape(item.Comunicados)}</p>
        </div>
      </Stack>
        
       
      </Modal>
    </>)
}


const theme = getTheme();
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
      width:'60%'
    },
    header: [
      // eslint-disable-next-line deprecation/deprecation
      theme.fonts.xLargePlus,
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        alignItems: 'center',
        fontWeight: FontWeights.semibold,
        padding: '12px 12px 14px 24px',
      },
    ],
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: { margin: '14px 0' },
        'p:first-child': { marginTop: 0 },
        'p:last-child': { marginBottom: 0 },
      },
    },
  });
const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: 'auto',
      marginTop: '4px',
      marginRight: '2px',
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
  };

  export default ModalTools;