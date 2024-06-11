import { type Locator, type Page } from '@playwright/test';
import { ReservationInformation } from '../models/reservation-information.model';

export class HomePage {
    private readonly page: Page;
    private readonly cityField: Locator;
    private city: any;
    private readonly checkInDateField: Locator;
    private readonly checkOutDateField: Locator;
    private readonly roomsField: Locator;
    private readonly adultsField: Locator;
    private readonly childrenField: Locator;
    private readonly searchButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cityField = this.page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_LocationComboBox_B-1Img');
        this.checkInDateField = this.page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_CheckInDateEdit_I');
        this.checkOutDateField = this.page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_CheckOutDateEdit_I');
        this.roomsField = this.page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_RoomsComboBox_I');
        this.adultsField = this.page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_AdultsSpinEdit_I');
        this.childrenField = this.page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_ChildrenSpinEdit_I');
        this.searchButton = this.page.locator('#MainContentPlaceHolder_SearchPanel_SearchPanelLayout_SearchButton_CD');
    }


    public async goToDxHotels(): Promise<void> {
        await this.page.goto('https://demos.devexpress.com/rwa/dxhotels/');
    }

    public async search(travelInformation: ReservationInformation): Promise<void> {
        await this.cityField.click();
        this.city = this.page.getByRole('cell', { name: travelInformation.city, exact: true });
        await this.city.click();
        await this.checkInDateField.fill(travelInformation.checkInDate);
        await this.checkOutDateField.fill(travelInformation.CheckOutDate);
        await this.roomsField.fill(travelInformation.rooms);
        await this.adultsField.fill(travelInformation.adults);
        await this.childrenField.fill(travelInformation.children);
        await this.searchButton.click();
    }
}