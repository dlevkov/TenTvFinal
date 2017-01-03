export class Taboola {
    taboolaJsObject: any = window['NanaTaboola'];
    placeHolderId: string;
    placement: string;
    mode: string;
    objectType: string;

    appendTaboolaContent() {
        this.taboolaJsObject.initContent(this.placeHolderId, this.placement, this.mode);
    }

    appendTabolaBodyEnd() {
        this.taboolaJsObject.insertFooter();
    }

    appendTaboolaHead() {
        this.taboolaJsObject.insertHeader();
    }

}
