/**
 * MainModel
 */
import { Constants } from '../../common/Constants';
import { FilterServiceComponent } from '../../targeted/components/filter-service/filter-service.component';

export class HeadlineModel {
    public DestArticleID?: number;
    public DisplayOrder?: number;
    public Title?: string;
    public PrimeTag?: string;
    public SubTitle?: string;
    public StripeColor?: string;
    public ServiceID?: number;
    public HebServiceName?: string;
    public MediaStockImageID?: number;
    public MediaStockImageAlt?: string;
    public MediaStockImageCredit?: string;
    public VideoID?: number;
    public DisplaySigns?: number;
    public LastModifyDate?: string;
    public CounterId: number;
    public AdsSecond: boolean = false;
    public HeadlineType: string;
    public AlertId: number = -1;
    public PairStart: boolean = false;
    public ImageTimeout: number = -1;

     constructor(parameters) {
        this.DestArticleID = parameters.DestArticleID;
        this.DisplayOrder = parameters.DisplayOrder;
        this.Title = parameters.Title;
        this.PrimeTag = parameters.PrimeTag;
        this.SubTitle = parameters.SubTitle;
        this.ServiceID = parameters.ServiceID;
        this.StripeColor = FilterServiceComponent.getColorBySid(this.ServiceID) !== '' ? FilterServiceComponent.getColorBySid(this.ServiceID) : parameters.StripeColor;
        this.HebServiceName = parameters.HebServiceName;
        this.MediaStockImageID = parameters.MediaStockImageID;
        this.MediaStockImageAlt = parameters.MediaStockImageAlt;
        this.MediaStockImageCredit = parameters.MediaStockImageCredit;
        this.VideoID = parameters.VideoID;
        this.DisplaySigns = parameters.DisplaySigns;
        this.LastModifyDate = parameters.LastModifyDate;
        this.CounterId = parameters.Id;
        this.HeadlineType = this.getTypeString;
        this.ImageTimeout = parameters.ImageTimeout;
    }

    public isDfp(i: any, TopFourEndIndex: any, AlertsEndIndex: any, isFiltered: boolean): boolean {
        let res: boolean = false;
        if (isFiltered)
            res = i !== 0 && (i === TopFourEndIndex || i === AlertsEndIndex); else
            res = i !== 0 && (i === TopFourEndIndex || i === AlertsEndIndex || (i >= TopFourEndIndex && (i - TopFourEndIndex) % 5 === 0));
        return res;
    }

    public getClass(i: any): string {
        return this.HeadlineType;
    }

    get isMain(): boolean {
        return this.CounterId === 0;
    }
    get isTopFour(): boolean {
        return this.isMain || (this.CounterId >= 1 && this.CounterId <= 3);
    }

    get isSmall(): boolean {
        return !this.isTopFour && (this.HeadlineType === 'Small' || this.HeadlineType === 'Video');
    }

    get isBig(): boolean {
        return !this.isMain && (this.HeadlineType === 'Big' || this.isTopFour);
    }

    get isAlert(): boolean {
        return !this.isTopFour && this.HeadlineType === 'Alert';
    }

    get isAd(): boolean {
        return !this.isTopFour && this.HeadlineType === 'Ad' && !this.AdsSecond;
    }

    get isAdSecond(): boolean {
        return !this.isTopFour && this.HeadlineType === 'Ad' && this.AdsSecond;
    }

    get isPair(): boolean {
        return !this.isTopFour && this.HeadlineType === 'Pair' && this.PairStart;
    }

    get getTypeString(): string {
        return Constants.HEADLINETYPES[this.DisplaySigns];
    }

   
}
