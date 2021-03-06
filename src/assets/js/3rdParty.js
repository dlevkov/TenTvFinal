// Load DFP --
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function () {
  var gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  var useSSL = 'https:' == document.location.protocol;
  gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
  var node = document.getElementsByTagName('script')[0];
  node.parentNode.insertBefore(gads, node);
})();


// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function (callback /*, thisArg*/ ) {

    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception. 
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

//casttime native player
function casttimePlayer() {
  this.platform = "unknown";
  this.init = function () {
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
  this.getMobileOperatingSystem = function () {
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
  insertHeader: function () {
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
    ! function (e, f, u, i) {
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

  insertFooter: function () {
    window._taboola = window._taboola || [];
    _taboola.push({
      flush: true
    });
  },

  initContent: function (id, placement, mode) {
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
  currentLineHeight: 20,
  getCssPropertyValue: function (selector, cssProp) {
    var currentSelector = document.querySelector(selector);
    if (currentSelector != null) {
      var currentSelectorStyle = window.getComputedStyle(currentSelector, null).getPropertyValue(cssProp);
      return currentSelectorStyle;
    } else return this.currentFontSize;
  },
  fontSelectors: ['.rsvp_article_inner_content p:not(.oedoopror)', '.rsvp_article_inner_content strong', '.rsvp_article_body_h1', '.rsvp_article_body_h2', '.rsvp_feed_item_title', '.rsvp_article_inner_content span', '.rsvp_article_inner_content a'],

  changeFontSize: function (zoomin) {
    this.currentFontSize = parseInt(this.getCssPropertyValue(this.fontSelectors[0], 'font-size'));
    if ((this.currentFontSize >= this.maxFontSize && zoomin) || (this.currentFontSize <= this.minFontSize && !zoomin))
      return false;
    var zoomI = zoomin ? 1 : -1;
    this.currentLineHeight += (this.fontInterval * zoomI);
    this.lineHeight += (this.fontInterval * zoomI);
    for (var key in this.fontSelectors) {
      var selectors = document.querySelectorAll(this.fontSelectors[key]);
      if (typeof selectors !== undefined && selectors) {
         var preLineHeight = parseInt(this.getCssPropertyValue(this.fontSelectors[key], 'line-height'));
        for (var i = 0; i < selectors.length; i++) {
          if (typeof selectors[i] !== undefined && selectors[i]) {
            selectors[i].style.fontSize = (parseInt(this.getCssPropertyValue(this.fontSelectors[key], 'font-size')) + (this.fontInterval * zoomI)) + "px";
            if (preLineHeight !== this.currentLineHeight 
                && ((parseInt(selectors[i].style.lineHeight, 10) !== (this.currentLineHeight)) || isNaN(parseInt(selectors[i].style.lineHeight, 10)))) {
              selectors[i].style.lineHeight = this.currentLineHeight + "px";
            }
          }
        }
      }
    }
  }
}

var AdUnitsCollectionIndex = {
  list: [],
  currentId: 0,
  count: 0,
  init: function () {
    //
    console.log('dfp init');
    for (var i = 0; i < this.list.length; i++) {
      this.currentId = i;
      this.list[i].init();
    }
  },

  add: function (unit) {
    if (this.isUnique(unit)) {
      this.list.push(unit)
    }
  },

  isUnique: function (unit) {
    this.list.forEach(function (element) {
      if (this.slotName === unit.slotName) {
        return false;
      }
    }, this);

    return true;
  },

  reset: function () {
    this.list.length = 0;
    this.currentId = 0;
    this.count = 0;
  },

  getUnitsCount: function () {
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

  this.init = function () {
    this.initGeneral();
  };

  //
  this.initGeneral = function () {
    googletag.cmd.push(function () {
      for (var i = 0; i < AdUnitsCollectionIndex.list.length; i++) {
        var unit = AdUnitsCollectionIndex.list[i];

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
      }

    });
  };

  //
  this.validPosition = function () {
    var res = true;
    res = document.getElementById(this.slotName) !== null ? true : false;
    return res;
  };
}

var nanaRoute = {
  initialized: false,
  routeEvent: document.createEvent("Event"),

  invokeRouteEvent: function (url, isArticle, isPromoted, isTwitter, articleData, isFiltered) {
    //invoke
    if (!this.initialized) return false;
    this.routeEvent.routeUrl = url;
    this.routeEvent.isArticle = isArticle;
    this.routeEvent.isPromoted = isPromoted;
    this.routeEvent.isTwitter = isTwitter;
    this.routeEvent.articleData = articleData;
    this.routeEvent.isFiltered = isFiltered;
    document.dispatchEvent(this.routeEvent);
  },

  initRouteEvents: function () {
    this.routeEvent.initEvent("RouteEvent", true, true);
    this.initialized = true;
  },
  navigateBack: function () {
    window.angularComponentNav.zone.run(
      function () {
        window.angularComponentNav.component.navigateBack();
      }
    );
  },
  navigateHome: function () {
    window.angularComponentNav.zone.run(
      function () {
        window.angularComponentNav.component.navigateHome();
      }
    );
  },
  init: function () {
    this.initRouteEvents();
    document.addEventListener("RouteEvent", castTimeHelper.routeHandler, false);
  },
};

var castTimeHelper = {
  platform: '',
  casttimePlayerRef: new casttimePlayer(),
  routerHelper: {},
  routeHandler: function (data) {
    castTimeHelper.platform = castTimeHelper.casttimePlayerRef.getMobileOperatingSystem();
    castTimeHelper.routerHelper = {
      url: data.routeUrl,
      isArticle: data.isArticle,
      isPromoted: data.isPromoted,
      isTwitter: data.isTwitter,
      articleData: data.articleData,
      isFiltered: data.isFiltered
    };
    if (castTimeHelper.platform === "android" && typeof Android !== "undefined") {
      Android.webPageUpdated(JSON.stringify(castTimeHelper.routerHelper));
    } else if (castTimeHelper.platform === "ios" && typeof webkit !== "undefined") {
      webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(castTimeHelper.routerHelper));
    } else {
      console.log(castTimeHelper.routerHelper);
    }
  },

  showNativeMaavaron: function () {
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
  toggleServiceFilter: function () {
    window.angularComponentRef.zone.run(function () {
      window.angularComponentRef.component.toggleFilter()
    });
    // this.triggerFilter(true);

  },

  triggerFilter: function (isVisible) {
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
  changeFontSize: function (zoomin) {
    nanaHelper.changeFontSize(zoomin);
  },
  navigateBack: function () {
    nanaRoute.navigateBack();
  },
  navigateToHomePage: function () {
    nanaRoute.navigateHome();
  }
};


var NanaGoogleTag = {
  groupName: '', //for article and section [SectionName] property of section, default/main value 'tentvapp'
  ServiceName: '', // for article and section [ServiceName] property of Service, default/main value '0',
  sponsorshipName: '', // for article and section [Tag] property of Sponsorship, default/main value '0',
  setNanaGoogleTagParams: function (data) {
    this.groupName = data.SectionName ? data.SectionName : 'tentvapp';
    this.ServiceName = data.ServiceName ? data.ServiceName : '0';
    this.sponsorshipName = data.SponsorShipName ? data.SponsorShipName : '0';
  },
};

nanaRoute.init();
