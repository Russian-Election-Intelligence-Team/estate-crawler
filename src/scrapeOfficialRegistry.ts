import { Actor } from 'apify';
import { Dictionary, launchPlaywright } from 'crawlee';
import { Page } from 'playwright';

export async function scrapeOfficialRegistry() {
    const formUrl = 'https://lk.rosreestr.ru/eservices/real-estate-objects-online';
    const browser = await launchPlaywright();

    const addresses = (await Actor.getInput() as Dictionary)['addresses'];

    addresses.forEach(async (address: string) => {
        const page = await browser.newPage();
        await page.goto(formUrl);
        await Actor.pushData(await queryForm(page, address));
        await page.close();
    });

    await browser.close();
}

export async function queryForm(_page: Page, _address: string): Promise<{}> {
    throw new Error('Not implemented');
    return {};
}
