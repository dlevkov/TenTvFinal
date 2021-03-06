import { NanaRouterDataSenderService } from './targeted/services/nanaRouter-data-sender.service';
import { DfpInSectionStripComponent } from './common/components/3rdParty/dfp/dfp-in-section-strip.component';
import { DfpBoxComponent } from './common/components/3rdParty/dfp/dfp-box.component';
import { InArticleListComponent } from './common/components/3rdParty/dfp/dfp-in-article-list.component';
import { DfpStripComponent } from './common/components/3rdParty/dfp/dfp-strip.component';
import { DfpInboardComponent } from './common/components/3rdParty/dfp/dfp-inboard.component';
import { DynamicComponent } from './common/components/3rdParty/dfp/dfp-dynamic.component';
import { NgModule, ApplicationRef, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { ThirdPartyComponent } from './common/components/3rdParty/third-party.component';

// Logger
import { CustomErrorHandler } from './app.error.handler';
import { WebApiErrorLogger } from './common/services/webapi-error-logger.service';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { ScrollTop } from './common/components/scroll-top/scroll-top.component';
import { NoContent } from './common/components/no-content';
import { SectionComponent } from './targeted/components/section/section.component';

import { HeadlineBigComponent } from './common/components/headlines/headline-big.component';
import { HeadlineSmallComponent } from './common/components/headlines/headline-small.component';
import { HeadlineMainComponent } from './common/components/headlines/headline-main.component';
import { HeadlineAlertComponent } from './common/components/headlines/headline-alert.component';
import { HeadlineAdComponent } from './common/components/headlines/headline-ad.component';
import { HeadlineAdSecondComponent } from './common/components/headlines/headline-adsecond.component';
import { HeadlinePairComponent } from './common/components/headlines/headline-pair.component';
import { TaboolaMain } from './common/components/3rdParty/taboola.component';
import { Maavaron } from './common/components/3rdParty/maavaron.component';
import { ArticlesListComponent } from './targeted/components/articles-list/artilcles-list.component';
import { Video } from './common/components/video/video.component';
import { Controller } from './common/components/global/controller.component';

import { ArticleComponent } from './targeted/components/article/article.component';
import { ParagraphComponent } from './targeted/components/paragraph/paragraph.component';
import { MainComponent } from './targeted/components/main/main.component';
import { TwitterToolbarComponent } from './common/components/twitter/twitter-toolbar.component';
import { TwitterComponent } from './common/components/twitter/twitter.component';
import { GoogleTagManager } from '../app/common/components/3rdParty/googleTagManager';

import { FilterServiceComponent } from './targeted/components/filter-service/filter-service.component';
import { FilterServiceItemComponent } from './targeted/components/filter-service/filter-service-item.component';
import { HtmlContentParser } from '../app/common/HtmlContentParser';
import { FilterConfirmation } from './targeted/components/filter-service/filter-confirmation.component';
import { FilterTooltipComponent } from './targeted/components/filter-service/filter-tooltip.component';
import { PreFilterMessage } from './targeted/components/filter-service/pre-filter-message.component';


// Cookies, based on this package
import { CookieService, CookieOptions } from 'angular2-cookie/core';


// Animated "scroll to element" functionality
import { Ng2PageScrollModule } from 'ng2-page-scroll';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  CookieService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    NoContent,
    ArticleComponent,
    SectionComponent,
    MainComponent,
    HeadlineSmallComponent,
    HeadlineBigComponent,
    ParagraphComponent,
    HeadlineMainComponent,
    HeadlineAlertComponent,
    HeadlinePairComponent,
    HeadlineAdComponent,
    HeadlineAdSecondComponent,
    ThirdPartyComponent,
    TaboolaMain,
    TwitterToolbarComponent, TwitterComponent,
    Maavaron,
    ScrollTop,
    ArticlesListComponent,
    FilterServiceComponent,
    FilterServiceItemComponent,
    FilterConfirmation,
    FilterTooltipComponent,
    PreFilterMessage,
    Video,
    Controller,
    GoogleTagManager,
    DynamicComponent,
    DfpInboardComponent,
    DfpStripComponent,
    InArticleListComponent,
    DfpBoxComponent,
    DfpInSectionStripComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    Ng2PageScrollModule.forRoot()
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    { provide: CookieService, useFactory: cookieServiceFactory },
    WebApiErrorLogger,
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    HtmlContentParser,
    NanaRouterDataSenderService
  ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
// DO NOT TOUCH, used to close angular2-cookie bug #37,
// Cookie options fix
// https://github.com/salemdar/angular2-cookie/issues/37
export function cookieServiceFactory() {
  return new CookieService();
}
