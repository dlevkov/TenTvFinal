export class GtmModel {
    ServiceName: string;
    SponsorShipName: string;
    SectionName: string;

    constructor(data) {
        this.ServiceName = data[0].ServiceName;
        this.SectionName = data[0].SectionName;
        this.SponsorShipName = data[0].SponsorShipName;
    }
}
