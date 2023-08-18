import { Actor } from 'apify';
import { Dictionary, launchPlaywright } from 'crawlee';
import { Page } from 'playwright';
import { URL } from 'url';

export async function scrapeDommingkh() {
    const browser = await launchPlaywright();
    const input = await Actor.getInput() as Dictionary;
    const region = input['region'];
    const addresses = input['addresses'];

    for (const address of addresses) {
        const page = await browser.newPage();
        await page.goto(makeUrl(region, address));
        const propertyPage = await getPropertyPage(page, address);
        if (!propertyPage) {
            console.log(`No property page found for ${address}`);
            await page.close();
            return;
        }
        await Actor.pushData(await getData(propertyPage));
        await page.close();
    }

    await browser.close();
}

function makeUrl(region: string, address: string): string {
    let search = new URL('search', 'https://dom.mingkh.ru');
    search.searchParams.set('address', `${region} ${address}`);
    search.searchParams.set('searchtype', 'house');
    return search.toString();
}

async function getPropertyPage(page: Page, address: string): Promise<Page | null> {
    address.replace(/\s+/g, '\\s*');
    
    while (true) {
        await page.waitForSelector('.table-responsive');

        const linkElement = page
            .getByRole('link')
            .filter({ hasText: RegExp(address) }).first();
        if (linkElement) {
            await linkElement.click();
            return page;
        }

        const nextPageLink = await page.$('a[rel="next"]');
        if (!nextPageLink) {
            return null;
        }
        await nextPageLink.click();
    }
}

async function getData(page: Page): Promise<{}> {
    const residentialUnitsText = await page.locator('dt:has-text("Жилых помещений") + dd').textContent();
    const address = await page.locator('dt:has-text("Адрес") + dd').textContent();
    if (!residentialUnitsText) {
        return {};
    }
    const numberOfResidentialUnits = parseInt(residentialUnitsText);
    return { address, numberOfResidentialUnits };
}