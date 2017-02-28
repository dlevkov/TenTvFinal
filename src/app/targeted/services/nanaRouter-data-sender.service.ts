import { SectionModel } from '../models/section.model';
import { ArticleModel } from '../models/article.model';
import { ArticleShareData } from '../models/article-share-data.model';
import { Injectable } from '@angular/core';

@Injectable()
export class NanaRouterDataSenderService {
    private static _nanaRouteRef: any;

    constructor() {
        if (NanaRouterDataSenderService._nanaRouteRef !== null)
            NanaRouterDataSenderService._nanaRouteRef = window['nanaRoute'];
    }
    public SendArticleData(artData: ArticleModel) {
        if (artData === null) return;
        NanaRouterDataSenderService._nanaRouteRef.invokeRouteEvent('/article/' + artData.ArticleID,
            true, false, false, new ArticleShareData(artData.ShareUrl, artData.Title, artData.SubTitle), false);
    }

    public SendFiltered(isFiltered: boolean) {
        NanaRouterDataSenderService._nanaRouteRef.invokeRouteEvent('/main', false, false, false, null, isFiltered);
    }

    public SendTwitter() {
        NanaRouterDataSenderService._nanaRouteRef.invokeRouteEvent('/twitter', false, false, true, null, false);
    }

    public SendSection(sectionModel: SectionModel) {
        NanaRouterDataSenderService._nanaRouteRef.invokeRouteEvent('/section/' + sectionModel.SectionID, false, true, false, null, false);
    }
}

export interface INanaRouteProvider {
    SendData();
}
