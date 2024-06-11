import { expect, Locator, Page } from "@playwright/test";
import { ReservationFilter } from "../models/reservation-filter.model";
import { Converter } from "../utils/coverter.utils";


export class ResultsPage {
    private readonly page: Page;
    private readonly priceRangeField: Locator;
    private readonly applyButton: Locator;
    private readonly summaryLabel: Locator;
    constructor(page: Page) {
        this.page = page;
        this.priceRangeField = page.locator('#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_I');
        this.applyButton = page.locator('#MainContentPlaceHolder_FilterFormLayout_ApplyFilterButton_CD');
        this.summaryLabel = page.getByText('Your Reservation Summary', { exact: true });
    }



    public async filter(filters: ReservationFilter) {
        this.page.setDefaultTimeout(60000);
        await expect(this.page.locator('#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_MD')).toBeVisible();
        await this.page.locator('#MainContentPlaceHolder_FilterFormLayout_NightlyRateTrackBar_MD').click();

        let initialValue = parseInt((await this.page.locator('#NightyRateTrackBarLabel_L').innerText()).split('$')[1]);
        console.log('initialValue', initialValue);
        while (initialValue < filters.minPrice || initialValue > filters.maxPrice) {

            if (initialValue > 250) {

                this.page.mouse.wheel(0, -200);
            }
            if (initialValue < 200) {
                this.page.mouse.wheel(0, 100);
            }
            initialValue = parseInt((await this.page.locator('#NightyRateTrackBarLabel_L').innerText()).split('$')[1]);
            console.log('initialValue', initialValue);

        }

        await this.desSelectStars(filters.starts);
        await this.page.locator('span').filter({ hasText: 'APPLY' }).click();
    }

    private async desSelectStars(starNumbers: number) {
        for (let index = 0; index < starNumbers - 1; index++) {
            const xpath = `#MainContentPlaceHolder_FilterFormLayout_OurRatingCheckBoxList_RB${index}_I_D`;
            let start = this.page.locator(xpath);
            await start.click();
        }

    }


    public async selectPrice() {
        const price = await this.getPrice();
        expect((await this.page.locator('.hotel-right-block').all()).length).toBeGreaterThanOrEqual(1);
        const items = await this.page.locator('.hotel-right-block').all();
        let path = '';
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if ((await element.first().innerText()).includes(price.toString())) {
                path = `MainContentPlaceHolder_HotelsDataView_IT${index}_BookItButton_${index}_I`;
                console.log('index', index);
                console.log('path', path);
                break;
            }

        }
        
       await this.clickButton(path);


    }

    private async getPrice(): Promise<number> {
        this.page.setDefaultTimeout(60000);
        const listResults = await this.page.locator('.price').all();
        console.log('count', listResults.length);
        let price = 0;
        for (let item of await this.page.locator('.price').all()) {
            console.log('eentro al ciclo');
            if (price == 0) {

                price = Converter.convertToNumber(await item.innerText());
            }

            price = Converter.convertToNumber(await item.innerText()) < price ? Converter.convertToNumber(await item.innerText()) : price;
        }
        console.log('price', price);
        return price;

    }

    public viewSummary(): Locator {
        return this.summaryLabel;
    }

    private async clickButton(path: string){
        await this.page.evaluate((selector) => {
            const button = document.getElementById(selector);
            if (button) {
                button.style.display = 'block';
                button.click();
            }
        }, path);
    }


}
