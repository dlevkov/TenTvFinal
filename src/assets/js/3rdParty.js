// Load DFP --
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
    var gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    var useSSL = 'https:' == document.location.protocol;
    gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
})();

$nana(document).ready(function() {
    //nanaRoute.init();
    //AdUnitsCollectionIndex.init();
});

//casttime native player
function casttimePlayer() {
    this.platform = "unknown";
    this.init = function() {
        this.platform = this.getMobileOperatingSystem();
        if (this.platform === "android" && typeof Android !== "undefined") {
            Android.showWebToast(JSON.stringify(this.casttimeObject));
        } else if (this.platform === "ios" && typeof webkit !== "undefined") {
            webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(this.casttimeObject))
        } else {
            console.log("Platform: " + this.platform);
        }
    };

    this.casttimeObject = {
        Title: "האם ג'ודי הלכה רחוק מדי כדי להגן על בעלה?",
        SubTitle: "היא חלמה להיות הגברת הראשונה של ישראל, אשת הנשיא או ראש הממשלה - אבל כאשר התפוצצה ב\"הארץ\" הפרשה האחרונה, שהובילה לפרישתו של בעלה סילבן שלום - נראה שגם ג'ודי שלום ניר מוזס הרשתה לעצמה לעשות דברים שלא עשתה בעבר. איפה עובר הגבול בין התייצבות לצד בן הזוג, לבין מעשים הפוגעים באחרים?",
        SeasonId: 84,
        UserID: "45E4A9FB-FCE8-88BF-93CC-3650C39DDF28",
        VideoId: 1031083,
        DfpAdUnit: "CDN_10TV",
        DfpAdUnitLive: "CDN_Live"
    };
    this.getMobileOperatingSystem = function() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
            return "android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "ios";
        }
        return "unknown";
    };
};

var NanaTaboola = {
    objectType: "home",
    headerObject: {},
    insertHeader: function() {
        switch (this.objectType) {
            case "home":
                this.headerObject = {
                    home: 'auto'
                };
                break;
            case "article":
                this.headerObject = {
                    article: 'auto'
                };
                break;
            default:
                this.headerObject = {
                    home: 'auto'
                };
                break;
        }
        window._taboola = window._taboola || [];
        _taboola.push(this.headerObject);
        ! function(e, f, u, i) {
            if (!document.getElementById(i)) {
                e.async = 1;
                e.src = u;
                e.id = i;
                f.parentNode.insertBefore(e, f);
            }
        }(document.createElement('script'),
            document.getElementsByTagName('script')[0],
            '//cdn.taboola.com/libtrc/nana10tv-app/loader.js',
            'tb_loader_script');
    },

    insertFooter: function() {
        window._taboola = window._taboola || [];
        _taboola.push({
            flush: true
        });
    },

    initContent: function(id, placement, mode) {
        window._taboola = window._taboola || [];
        _taboola.push({
            mode: mode,
            container: id,
            placement: placement,
            target_type: 'mix'
        });
    }
};
var nanaHelper = {
    currentFontSize: 10,
    maxFontSize: 50,
    minFontSize: 16,
    fontInterval: 2,
    fontSelectors: ['.rsvp_article_inner_content p:not(p.oedoopror)', '.rsvp_article_body_h1', '.rsvp_article_body_h2', '.rsvp_feed_item_title', '.rsvp_article_inner_content *'],

    changeFontSize: function(zoomin) {
        console.log('zoomin: ' + zoomin);
        this.currentFontSize = parseInt($nana(this.fontSelectors[0]).css("font-size"));
        if ((this.currentFontSize >= this.maxFontSize && zoomin) || (this.currentFontSize <= this.minFontSize && !zoomin))
            return false;

        var zoomI = zoomin ? 1 : -1;
        this.currentFontSize += (this.fontInterval * zoomI);
        for (var key in this.fontSelectors) {
            var cancreateZoom = parseInt($nana(this.fontSelectors[key]).css('font-size'));
            cancreateZoom += (this.fontInterval * zoomI);
            $nana(this.fontSelectors[key]).attr("style", "font-size:" + cancreateZoom + "px; line-height:" + cancreateZoom + "px;");
        }
    }
}

var AdUnitsCollectionIndex = {
    list: [],
    currentId: 0,
    count: 0,
    init: function() {
        //
        console.log('dfp init');
        for (var i = 0; i < this.list.length; i++) {
            this.currentId = i;
            this.list[i].init();
        }
    },

    add: function(unit) {
        if (this.isUnique(unit)) {
            this.list.push(unit)
        }
    },

    isUnique: function(unit) {
        this.list.forEach(function(element) {
            if (this.slotName === unit.slotName) {
                return false;
            }
        }, this);

        return true;
    },

    reset: function() {
        this.list.length = 0;
        this.currentId = 0;
        this.count = 0;
    },

    getUnitsCount: function() {
        this.count = document.getElementsByTagName('dfp').length;
    }
};

function AdUnitsCollection() {
    this.slotName = "";
    this.slot = null;
    this.objectName = "main";
    this.adSize = [];
    this.adUnitName = "";
    this.initialized = false;

    this.init = function() {
        this.initGeneral();
    };

    //
    this.initGeneral = function() {
        googletag.cmd.push(function() {
            var unit = AdUnitsCollectionIndex.list[AdUnitsCollectionIndex.currentId];

            if (unit.initialized) return false;
            // Infinite scroll requires SRA
            googletag.pubads().enableSingleRequest();

            // Disable initial load, we will use refresh() to fetch ads.
            // Calling this function means that display() calls just
            // register the slot as ready, but do not fetch ads for it.
            googletag.pubads().disableInitialLoad();

            // Enable services
            googletag.enableServices();




            unit.slot = googletag.defineSlot(unit.adUnitName, unit.adSize, unit.slotName).addService(googletag.pubads());
            // Display has to be called before
            // refresh and after the slot div is in the page.
            googletag.display(unit.slotName);
            googletag.pubads().refresh([unit.slot]);
            googletag.pubads().collapseEmptyDivs(true);

            unit.initialized = true;
        });
    };

    //
    this.validPosition = function() {
        var res = true;
        res = document.getElementById(this.slotName) !== null ? true : false;
        return res;
    };
}

var nanaRoute = {
    initialized: false,
    routeEvent: document.createEvent("Event"),

    invokeRouteEvent: function(url, isArticle, isPromoted, isTwitter, articleData) {
        //invoke
        if (!this.initialized) return false;
        this.routeEvent.routeUrl = url;
        this.routeEvent.isArticle = isArticle;
        this.routeEvent.isPromoted = isPromoted;
        this.routeEvent.isTwitter = isTwitter;
        this.routeEvent.articleData = articleData;
        document.dispatchEvent(this.routeEvent);
    },

    initRouteEvents: function() {
        this.routeEvent.initEvent("RouteEvent", true, true);
        this.initialized = true;
    },
    navigateBack: function() {
        window.angularComponentNav.zone.run(
            function() {
                window.angularComponentNav.component.navigateBack();
            }
        );
    },
    init: function() {
        this.initRouteEvents();
        document.addEventListener("RouteEvent", castTimeHelper.routeHandler, false);
    },
};

var castTimeHelper = {
    platform: '',
    casttimePlayerRef: new casttimePlayer(),
    routerHelper: {},
    routeHandler: function(data) {
        castTimeHelper.platform = castTimeHelper.casttimePlayerRef.getMobileOperatingSystem();
        castTimeHelper.routerHelper = {
            url: data.routeUrl,
            isArticle: data.isArticle,
            isPromoted: data.isPromoted,
            isTwitter: data.isTwitter,
            articleData: data.articleData
        };
        if (castTimeHelper.platform === "android" && typeof Android !== "undefined") {
            Android.webPageUpdated(JSON.stringify(castTimeHelper.routerHelper));
        } else if (castTimeHelper.platform === "ios" && typeof webkit !== "undefined") {
            webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(castTimeHelper.routerHelper));
        } else {
            console.log(castTimeHelper.routerHelper);
        }
    },

    showNativeMaavaron: function() {
        castTimeHelper.platform = castTimeHelper.casttimePlayerRef.getMobileOperatingSystem();
        if (castTimeHelper.platform === "android" && typeof Android !== "undefined") {
            Android.sendInterstatialAd();
        } else if (castTimeHelper.platform === "ios" && typeof webkit !== "undefined") {
            webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify({
                activateMaavaron: true
            }));
        } else {
            console.log('maavaron shown!');
        }
    },

    //
    toggleServiceFilter: function() {
        window.angularComponentRef.zone.run(function() {
            window.angularComponentRef.component.toggleFilter()
        });
        // this.triggerFilter(true);

    },

    triggerFilter: function(isVisible) {
        castTimeHelper.platform = castTimeHelper.casttimePlayerRef.getMobileOperatingSystem();
        if (this.platform === "android" && typeof Android !== "undefined") {
            Android.filterStateChanged(isVisible);
        } else if (this.platform === "ios" && typeof webkit !== "undefined") {
            //webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(this.casttimeObject))
        } else {
            console.log('filter shown!');
        }
    },

    //
    changeFontSize: function(zoomin) {
        nanaHelper.changeFontSize(zoomin);
    },
    navigateBack: function() {
        nanaRoute.navigateBack();
    }
};

var contentParser = {
    scriptList: [],
    scriptSrcList: [],
    count: 0,
    length: 0,
    contentHref: function(content) {
        try {
            content = '<div>' + content + '</div>'; /*Wrapping income html string for jquery */
            var paragraphContent = $nana(content);
            $nana.each(paragraphContent.find('a[href*="nana.co.il"],a[href*="nana10.co.il"]'), function(i, item) {
                item.href = item.pathname + item.search.match(/\d+/); /*Get the first set of numbers in the string (example: ArticleID=123456)*/
                item.target = '_self'; /* removes target _blank */
            });
            return paragraphContent.html();
        } catch (error) {
            console.log('contentParser.contentHref failed to parse')
            return content;
        }
    },
    contentScript: function(content) {
        var script;
        try {
            content = '<div>' + content + '</div>'; /*Wrapping income html string for jquery */
            script = $nana(content).find('script').attr('class', 'third-party');
            contentParser.count++;
            contentParser.scriptList.push(script);
            if (contentParser.count === contentParser.length) {
                var result = [];
                $nana.each(contentParser.scriptList, function(i, item) {
                    if ($nana.inArray(item.attr('src'), contentParser.scriptSrcList) == -1) /** -1  means - not found*/ {
                        contentParser.scriptSrcList.push(item.attr('src'));
                        result.push(item);
                    }
                });
                $nana("head").append(result);
            }
        } catch (error) {
            console.log("contentParser.contentScript failed to parse");
        }
    }
};
var NanaGoogleTag = {
    groupName: '', //for article and section [SectionName] property of section, default/main value 'tentvapp'
    ServiceName: '', // for article and section [ServiceName] property of Service, default/main value '0',
    sponsorshipName: '', // for article and section [Tag] property of Sponsorship, default/main value '0',
    setNanaGoogleTagParams: function(data) {
        this.groupName = data.SectionName ? data.SectionName : 'tentvapp';
        this.ServiceName = data.ServiceName ? data.ServiceName : '0';
        this.sponsorshipName = data.SponsorShipName ? data.SponsorShipName : '0';
    },
};

nanaRoute.init();