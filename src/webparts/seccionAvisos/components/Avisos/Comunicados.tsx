import * as React from 'react';
import {useContext,useEffect, useState} from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { escape } from '@microsoft/sp-lodash-subset';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem, Modal, IconButton, IButtonStyles, getTheme, mergeStyleSets, FontWeights, IIconProps, IDragOptions, ContextualMenu, DefaultButton } from '@fluentui/react';
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
import Carousel from 'react-grid-carousel'

const Comunicados= (props)=>{
    const context=useContext(SPContext);
    const sp = spfi().using(SPFx(context.context));
    const {Count,ListName} = props;
    const [data,setData]=useState([]);    
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(context.modal);
    const [index,setIndex] = useState(null);
    useEffect(() => {
      async function fecthData(){
          let getData:[];
          let cantidad=Count==undefined?4:parseInt(Count);
            try {        
               getData=await sp.web.lists.getByTitle(ListName).items.orderBy("Fecha", false).select("*").top(cantidad)() 
               setData(getData)
             } catch (error) {
                 console.log(error);
               }
                 }
            fecthData();
           }, []) 
    

  return(<> 
   <Grid container spacing={2}>
   
    
     {data.length>0 ? <Carousel cols={2} rows={1} gap={10} loop>
      {data.map((item,index)=>
<Carousel.Item>
    
    <div className={style.row}>
  <div className={`${style.example1} ${style.card}`}>
    <div className={style.wrapper}>
      
      <div className={style.date}>
        <span className={style.day}>{moment(item.Fecha).format('dd')}</span>
        <span className={style.month}>{moment(item.Fecha).format('MMMM')}</span>
        <span className={style.year}>{moment(item.Fecha).format('yyyy')}</span>
      </div>
		 
		 <div className={style.image}>
			 <img className={style.bookimage} src={JSON.parse(item.FotoDelComunicado).serverRelativeUrl}/>
		 </div>
      
      <div className={style.data}>
        <div className={style.contentC}>
          {/* <span className={style.author}>Jane Doe</span> */}
          <h3 className={style.title}><a href="#" className={style.cardTitle}>{item.Title}</a></h3>
          <p className={style.text}>{(item.Comunicados as string).substring(0,150)}</p>
          <DefaultButton onClick={()=>{context.onChangeContext(context.modal),setIndex(index)}} text="Ver más" />
        </div>
      </div>
      
    </div>
  </div>
</div>

    
      </Carousel.Item>
     )}</Carousel> :"No exiten elementos"}
     
      {context.modal && <ModalTools data={data} index={index} /> }
 </Grid>
 </>)
}

export default Comunicados;