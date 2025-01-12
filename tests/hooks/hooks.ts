import { createBdd } from 'playwright-bdd';
import teardown from "@utils/teardown"

const { AfterScenario } = createBdd();


AfterScenario({tags: "@login"}, async ({ page }) => {
    await teardown(page);
})