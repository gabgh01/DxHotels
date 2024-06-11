import { expect, test } from '@playwright/test';
import { ReservationFilter } from '../src/models/reservation-filter.model';
import { ReservationInformation } from '../src/models/reservation-information.model';
import { HomePage } from '../src/pages/home-page';
import { ResultsPage } from '../src/pages/results-page';
import { DateUtils } from '../src/utils/date-utils';

test.describe('hotel reservation', () => {
  test('create reservation DxHotels page', async ({ page }) => {
    const travelInformation: ReservationInformation = {
      city: 'London',
      checkInDate: DateUtils.formatDate(DateUtils.addDays(new Date(), 2)),
      CheckOutDate: DateUtils.formatDate(DateUtils.addDays(new Date(), 7)),
      rooms: '2',
      adults: '3',
      children: '2',
    };

    const filter: ReservationFilter = {
      minPrice: 200,
      starts: 3,
      maxPrice: 300
    }
    const homePage = new HomePage(page);
    const resultPage = new ResultsPage(page);
    await homePage.goToDxHotels();
    await homePage.search(travelInformation);
    await resultPage.filter(filter);
    await resultPage.selectPrice();
    await expect(resultPage.viewSummary()).toBeVisible();
    
    page.pause();

  });

})