import * as React from 'react';
import {
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardImage,
  IDocumentCardStyles,
  DocumentCardType,
  DocumentCardLocation,
} from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';
import { useContext, useEffect, useState } from 'react';
import { Stack, ActionButton, IStackTokens, IStackStyles, DefaultPalette, CommandBarButton } from '@fluentui/react';
import { SPContext } from '../SeccionAvisos';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as moment from 'moment';
import getThumb from '../tools/GetIMGYoutube';
import { DocumentCardStatus } from 'office-ui-fabric-react';
import Carousel from 'react-grid-carousel';
import { SecurityTrimmedControl, PermissionLevel } from "@pnp/spfx-controls-react/lib/SecurityTrimmedControl";
import { SPPermission } from '@microsoft/sp-page-context';
const customSpacingStackTokens: IStackTokens = {
  childrenGap: '10%',
  padding: 's1 2%',
};
const stackStyles: IStackStyles = {
  root: {
    // background: DefaultPalette.themeTertiary,
    width: '100%',
  },
};

export const Eventos = (props) => {
  const cardStyles: IDocumentCardStyles = {
    root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
  };
  const context = useContext(SPContext);
  const sp = spfi().using(SPFx(context.context));
  const url = context.context.pageContext.web.absoluteUrl;
  const { Count, ListName } = props;
  const [data, setData] = useState([]);
  moment.locale('es');
  let dateFilter: string = "EventDate ge datetime'" + moment().format() + "' and EndDate lt datetime'" + moment().add(1, "month").format() + "'";
  useEffect(() => {
    async function fecthData() {
      let getData: [];
      let cantidad = Count == undefined ? 4 : parseInt(Count);
      try {
        getData = await sp.web.lists.getById(ListName).items
          .orderBy("EventDate")
          .select("*,Id,Workspace,Title,EventDate,EndDate,fAllDayEvent,Category,Location")
          .top(cantidad)
          .filter(dateFilter)();
        setData(getData);
      } catch (error) {
        console.log(error);
      }
    }
    fecthData();
  }, [])
  return (
    <div>
      {data.length > 0 ? <>
        {/* Specify the components to load when user has the required permissions */}
        <SecurityTrimmedControl context={context.context}
          level={PermissionLevel.currentWeb}
          permissions={[SPPermission.editListItems]}>
          <Stack verticalAlign='center' horizontalAlign='start' tokens={customSpacingStackTokens}>
            <CommandBarButton
              role="menuitem"
              iconProps={{ iconName: 'Add' }}
              text={'Nuevo Evento'}
              href={`${url}/_layouts/15/Event.aspx?ListGuid=${ListName}&Mode=Edit`}
            />
          </Stack>
        </SecurityTrimmedControl>
        <Carousel cols={3} rows={1} gap={10} showDots >
          {data.map((item) => (
            <Carousel.Item>
              <DocumentCard
                type={DocumentCardType.normal}
                aria-label={item.description}
                styles={cardStyles}
              >
                <a href={item.Workspace ? item.Workspace.Url : `${url}/_layouts/15/Event.aspx?ListGuid=${ListName}&ItemId=${item.Id}`} target='_blank'>
                  <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={item.Workspace && (item.Workspace.Url).indexOf("youtube") > 0 ? getThumb(item.Workspace.Url) : item.BannerImageUrl} />
                </a>
                <DocumentCardDetails>
                  <DocumentCardLocation
                    location={item.Category}
                    locationHref={`${url}/_layouts/15/Event.aspx?ListGuid=${ListName}&ItemId=${item.Id}`}
                    ariaLabel={item.Category}

                  />

                  <DocumentCardTitle title={item.Title} shouldTruncate />
                  <DocumentCardStatus statusIcon="event" status={moment(item.EventDate).format('DD MMMM')} />
                  {item.Workspace && (item.Workspace.Url).indexOf("youtube") > 0 ?
                    <a href={item.Workspace.Url} target="_blank"><DocumentCardStatus statusIcon="MSNVideos" status={'Ver Video'} /></a> :
                    <a href={`${url}/_layouts/15/Event.aspx?ListGuid=${ListName}&ItemId=${item.Id}`}><DocumentCardStatus statusIcon="FabricOpenFolderHorizontal" status={'Ver Más'} /></a>
                  }
                  <ActionButton
                    iconProps={{ iconName: "AddEvent" }}
                    text={'Agregar a mi calendario'}
                    href={`${context.context.pageContext.site.absoluteUrl}/_vti_bin/owssvr.dll?CS=109&Cmd=Display&List=${ListName}&CacheControl=1&ID=${item.Id}&Using=event.ics`}
                  />
                </DocumentCardDetails>
              </DocumentCard>
            </Carousel.Item>
          ))}
        </Carousel></>
        : "No existen Eventos"}

    </div>
  );
};
export default Eventos;