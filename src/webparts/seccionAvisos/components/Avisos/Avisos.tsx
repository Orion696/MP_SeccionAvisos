import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { escape } from '@microsoft/sp-lodash-subset';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem, Modal, IconButton, IButtonStyles, getTheme, mergeStyleSets, FontWeights, IIconProps, IDragOptions, ContextualMenu, DefaultButton, PrimaryButton, Stack, CommandBarButton } from '@fluentui/react';
import { SPContext } from '../SeccionAvisos';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import style from '../SeccionAvisos.module.scss'
import Grid from '@material-ui/core/Grid';
import ModalTools from '../tools/Modal'
import * as moment from 'moment';
import ModalToolsAnun from '../tools/ModalA';
import Carousel from 'react-grid-carousel'
const Avisos = (props) => {
    const context = useContext(SPContext);
    const sp = spfi().using(SPFx(context.context));
    const { Count, ListName } = props;
    const [data, setData] = useState([]);
    moment.locale('es');   
    // const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(context.modal);
    const [index, setIndex] = useState(null);
    useEffect(() => {
        async function fecthData() {
            let getData: [];
            let cantidad = Count == undefined ? 4 : parseInt(Count);
            try {
                getData = await sp.web.lists.getByTitle(ListName).items.orderBy("Fecha", false).select("*").top(cantidad)()
                setData(getData)
            } catch (error) {
                console.log(error);
            }
        }
        fecthData();
    }, [])

    const addIcon: IIconProps = { iconName: 'Add' };
    return (<>
        <Grid container>
            <Carousel cols={4} rows={1} gap={5} loop showDots>

                {data.length > 0 && data.map((item, index) => (
                <Carousel.Item >
                        <div className={style.row}>
                            <div className={`${style.example1} ${style.card}`}>
                                <div className={style.wrapper}>

                                    <div className={style.date}>
                                        <span className={style.day}>{moment(item.Fecha).format('DD')}</span>
                                        <span className={style.month}>{moment(item.Fecha).format('MMMM')}</span>
                                        <span className={style.year}>{moment(item.Fecha).format('yyyy')}</span>
                                    </div>

                                    <div className={style.imageA}>
                                        <img className={style.bookimage} src={JSON.parse(item.Imagen).serverRelativeUrl} />
                                    </div> 
                                    <div className={style.dataA}>
                                        <div className={style.content}>
                                    <Stack horizontalAlign='center' >
                                    <a className={style.textcolor}  href="#" onClick={()=>{context.onChangeContext(context.modal),setIndex(index)}} >Ver más </a>
                                     {/* <PrimaryButton text="Ver más" onFocus={() => { context.onChangeContext(context.modal);setIndex(index); }} allowDisabledFocus  /> */}
                                   </Stack>
                                      </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                </Carousel.Item>))}
            </Carousel>
            {context.modal && <ModalToolsAnun data={data} index={index} />}
        </Grid>
    </>)
}

export default Avisos;