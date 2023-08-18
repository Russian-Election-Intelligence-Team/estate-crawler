import { Actor } from 'apify';
import { scrapeOfficialRegistry } from './scrapeOfficialRegistry.js';
import { scrapeDommingkh } from './scrapeDommingkh.js';

await Actor.init();

if (process.env.REGISTRY_SOURCE?.endsWith('rosreestr.ru')) {
    await scrapeOfficialRegistry();
}

if (process.env.REGISTRY_SOURCE?.endsWith('dom.mingkh.ru')) {}

await scrapeDommingkh();

await Actor.exit();


