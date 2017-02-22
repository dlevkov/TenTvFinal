export interface IResetable {
    ResetCounter();
}

export abstract class DfpUnitManager {
    public static instancesList: IResetable[] = [];
    public static ResetCounters() {
        DfpUnitManager.instancesList.forEach((element: IResetable) => {
            element.ResetCounter();
        });
    }

    public currentResolution: number[] = [];
    private _adUnitsCollectionIndex: any;

    constructor() {
        this.setCurrentResolution();
    }
    public AddInstance(inst: IResetable) {
        DfpUnitManager.instancesList.push(inst);

    }
    public abstract GetAdUnitSize();

    public AddDfpUnit(dfpObjectName: string, unitName: string, placeholderId: string, adSize: number[]): void {
        let unit = new window['AdUnitsCollection']();
        this._adUnitsCollectionIndex = window['AdUnitsCollectionIndex'];
        this._adUnitsCollectionIndex.getUnitsCount();

        unit.objectName = dfpObjectName;
        unit.slotName = placeholderId;
        unit.adSize = adSize;
        unit.adUnitName = unitName;

        this._adUnitsCollectionIndex.add(unit);
    }

    private setCurrentResolution() {
        this.currentResolution.length = 0;
        this.currentResolution = [screen.width, screen.height];
    }

}