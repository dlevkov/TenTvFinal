import { ImageTypes } from './Enums';

export class Constants {
    public static readonly SERVICE_KEY: string = 'service';
    public static readonly SEARCH_KEY: string = 'search';
    public static readonly IMAGE_LOADING_URL = '/assets/Images/preload640-640.png';
    public static readonly IMAGE_LOADING_URL16_9 = '/assets/Images/preload_640-360.png';

    public static DATA_DOMAIN = 'http://api.nana10.co.il/';
    public static readonly NANA_IMAGES_DOMAIN: string = 'http://f.nanafiles.co.il';
    public static readonly SCROLL_POSITION: number = 1000;
    public static readonly GOOGLEDFPID: string = '/9243695/';
    public static readonly MAAVARONTIMEOUT: number = 20000;

    public static readonly DFPADUNITS: any = Constants.InitDfpAdUnits();
    public static readonly HEADLINETYPES: any = Constants.InitHeadlineTypes();
    public static readonly DFPADUNITSNAMES: any = Constants.InitDfpAdUnitsName();
    public static readonly DFPLOADINGTIMEOUT: number = 1000;
    public static readonly TWITTERTICKERINTERVAL: number = 10000;
    public static readonly FILTERCOOKIENAME: string = 'tentvappfilter';

    public static readonly CATEGORYTOSECTION: any = Constants.CategoryToSection();


    public static CategoryToSection(): any {
        let dict: { [key: number]: number; } = {};
        dict[210116] = 13050;
        dict[210136] = 13053;
        dict[210138] = 13054;
        dict[210141] = 13048;
        dict[210198] = 13338;
        dict[210297] = 13052;
        dict[400296] = 10806;
        dict[400780] = 13064;
        dict[500148] = 13055;
        dict[500599] = 12349;
        dict[505520] = 12553;
        dict[505533] = 12623;
        dict[600028] = 13018;
        dict[600049] = 12462;
        dict[600092] = 12608;
        dict[600103] = 12728;
        dict[600111] = 12671;
        dict[600113] = 12678;
        dict[600121] = 13319;
        dict[600135] = 12676;
        dict[600141] = 12709;
        dict[600142] = 12710;
        dict[600157] = 12743;
        dict[600161] = 13066;
        dict[600164] = 12751;
        dict[600171] = 12995;
        dict[600188] = 12779;
        dict[600195] = 12811;
        dict[600199] = 12817;
        dict[600206] = 12828;
        dict[600213] = 12842;
        dict[600218] = 13006;
        dict[600225] = 12868;
        dict[600230] = 13074;
        dict[600234] = 12908;
        dict[600238] = 12892;
        dict[600240] = 12912;
        dict[600242] = 12918;
        dict[600250] = 2098;
        dict[600251] = 13069;
        dict[600257] = 2175;
        dict[600259] = 2171;
        dict[600262] = 2632;
        dict[600266] = 12928;
        dict[600272] = 12957;
        dict[600273] = 12946;
        dict[600277] = 13330;
        dict[600278] = 13096;
        dict[600300] = 13015;
        dict[600301] = 13038;
        dict[600313] = 13064;
        dict[600334] = 13128;
        dict[600338] = 10950;
        dict[600339] = 11536;
        dict[600340] = 2174;
        dict[600341] = 12584;
        dict[600342] = 13097;
        dict[600348] = 13136;
        dict[600355] = 13150;
        dict[600356] = 10934;
        dict[600357] = 13158;
        dict[600365] = 13168;
        dict[600367] = 13177;
        dict[600368] = 13185;
        dict[600383] = 13217;
        dict[600384] = 13220;
        dict[600395] = 13251;
        dict[600397] = 13262;
        dict[600400] = 13267;
        dict[600402] = 13271;
        dict[600403] = 11957;
        dict[600413] = 13302;
        dict[600415] = 13303;
        dict[600416] = 13307;
        dict[600418] = 13315;
        dict[600422] = 13354;
        dict[600429] = 13350;
        dict[600430] = 13352;
        dict[600431] = 13353;
        dict[600439] = 13366;
        dict[600440] = 13372;
        dict[600442] = 13379;
        dict[600443] = 13389;
        dict[600444] = 13414;
        dict[600447] = 13412;


        return dict;
    }

    public static InitHeadlineTypes(): any {
        let units = {
            10: 'Big',
            1: 'Video',  // temporary replaced by standard item in views
            2: 'Main',
            8: 'Ad',
            9: 'Pair',
            0: 'Small',
            6: 'Alert'
        };
        return units;
    }
    public static InitDfpAdUnits(): { [key: string]: string } {
        let units = {
            '10tv': 'Desktop_Nana10_Channel10_Inread',
            'bidur': 'Desktop_Nana10_Entertainment_Inread',
            'celebs': 'Desktop_Nana10_Celebs_Inread',
            'Food': 'Desktop_Nana10_Food_Inread',
            'gamer': 'Desktop_Nana10_Gamer_Inread',
            'lifestyle': 'Desktop_Nana10_style_Inread',
            'net': 'Desktop_Nana10_Net_Inread',
            'News': 'Desktop_Nana10_News_Inread',
            'sport': 'Desktop_Nana10_Sport_Inread'
        };
        return units;
    }

    public static InitDfpAdUnitsName(): any {
        let units = {
            maavaron: Constants.GOOGLEDFPID + 'Channel10_Interstitial_Ros_test1',
            // liveBox: googleDfpID + 'MOBILE_NANA10_LiveBoxVideo_300x250',
            strip: Constants.GOOGLEDFPID + 'Channel10_Strip_General_',
            box: Constants.GOOGLEDFPID + 'Channel10_Box_300X250',
            inboard: Constants.GOOGLEDFPID + 'Channel10_App_Inboard',
        };
        return units;
    }

    public static GetImagePathByType(mediaStockImageID, item: ImageTypes, mediaStockImageExt?: string): string {
        let currentType: number = 0;
        switch (item) {
            case ImageTypes.Thumbnail_109_59:
                currentType = 28;
                break;
            case ImageTypes.Main_303_165:
            case ImageTypes.Small_303_165:
                currentType = 493;
                break;
            case ImageTypes.HeadlIne_Big_460_258:
            case ImageTypes.Medium_460_258:
                currentType = 693;
                break;
            case ImageTypes.Standard_606_366:
                currentType = 1789;
                break;
            case ImageTypes.Big_768_400:
                currentType = 1677;
                break;
            case ImageTypes.Article_Default:
                currentType = 11;
                break;
            case ImageTypes.Main_450_450:
                currentType = 76;
                break;
            case ImageTypes.Small_130_72:
                currentType = 2;
                break;
            default:
                throw new EvalError('Not implemented ImageType:' + item);
        }
        return this.GetImagePath(mediaStockImageID, currentType, mediaStockImageExt);
    }

    private static GetImagePath(mediaStockImageID: number, mediaStockImageTypeID: number, mediaStockImageExt: string = 'jpg'): string {
        if (mediaStockImageID === 0)
            return '';
        if (mediaStockImageTypeID > 0) {
            return this.NANA_IMAGES_DOMAIN + '/upload/mediastock/img/' + mediaStockImageTypeID + '/' + (mediaStockImageID / 1000000).toFixed(0) +
                '/' + Math.floor((mediaStockImageID % 1000000) / 1000) + '/' + mediaStockImageID + '.' + mediaStockImageExt;
        }
        return this.NANA_IMAGES_DOMAIN + '/upload/mediastock/NOREPLICATION/img/' + (mediaStockImageID / 1000000).toFixed(0) + '/'
            + Math.floor((mediaStockImageID % 1000000) / 1000) + '/' + mediaStockImageID + '_THUMBNAIL.' + mediaStockImageExt;

    }
}
if ('development' === ENV) {
    // Dev
    // Constants.DATA_DOMAIN = 'http://api.nana10.co.il/';
    Constants.DATA_DOMAIN = 'http://localhost/Nana10MVC/';
}
