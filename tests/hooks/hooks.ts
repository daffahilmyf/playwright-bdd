import { createBdd } from 'playwright-bdd';
import teardown from "@utils/supports/teardown"
import { saveFile } from '@utils/index';

const { AfterScenario, AfterWorker } = createBdd();


AfterScenario({tags: "@login or @cart or @inventory"}, async ({ page }) => {
    await teardown(page);
})

AfterWorker(async () => {
    // set default temp data
    await saveFile('/temp/temp-item.json', JSON.stringify({}));
})