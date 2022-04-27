import * as React from 'react';
import {useContext,useEffect, useState} from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { escape } from '@microsoft/sp-lodash-subset';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem, Modal, IconButton, IButtonStyles, getTheme, mergeStyleSets, FontWeights, IIconProps, IDragOptions, ContextualMenu, DefaultButton, Stack ,PrimaryButton} from '@fluentui/react';
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
import jsPDF from "jspdf";
import html2pdf from 'html2pdf.js'

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
               getData=await sp.web.lists.getById(ListName).items.orderBy("Fecha", false).select("*").top(cantidad)() 
               setData(getData)
             } catch (error) {
                 console.log(error);
               }
                 }
            fecthData();
           }, []) 
           const exportPDF=(index)=>{
            const infoToPDF=data[index];
           let doc = new jsPDF("p", "mm", "a4");
           let img = new Image();
           const lMargin=15; //left margin in mm
           const rMargin=15; //right margin in mm
           const pdfInMM=210;  // width of A4 in mm
           doc.setFontSize(22);
           doc.text(infoToPDF.Title,30, 20 )
           img.src = JSON.parse(infoToPDF.FotoDelComunicado).serverRelativeUrl
           doc.addImage(img, 'png',30,30,60,75)
           let lines =doc.splitTextToSize(infoToPDF.Comunicados,240);
           doc.setFontSize(14);
           // doc.splitTextToSize(infoToPDF.Comunicados, 180);
           doc.text(lines,20,110);
           // doc.addFont('helvetica', 'normal')
           // doc.text('This is the second title.',20, 60 )
           // doc.text('This is the thrid title.',20, 100 )      
           
           doc.save('demo.pdf')
           // var opt = {
           //   margin:       1,
           //   filename:     'myfile.pdf',
           //   image:        { type: 'jpeg', quality: 0.98 },
           //   html2canvas:  { scale: 2 },
           //   jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
           // };
           // // New Promise-based usage:
           // html2pdf().set(opt).from(MyDocument).save();
           
           }

  return(<> 
   <Grid container spacing={2}>
     {data.length>0 ? <Carousel cols={2} rows={1} gap={10} loop>
      {data.map((item,index)=>
<Carousel.Item>
    
    <div className={style.row}>
  <div className={`${style.example1} ${style.card}`}>
    <div className={style.wrapper}>
      
      <div className={style.date}>
        <span className={style.day}>{moment(item.Fecha).format('DD')}</span>
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
         <span className={style.button}> <DefaultButton onClick={()=>exportPDF(index)} text="Descargar" /></span>
         <span className={style.button}> <PrimaryButton onClick={()=>{context.onChangeContext(context.modal),setIndex(index)}} text="Ver más" /></span>
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