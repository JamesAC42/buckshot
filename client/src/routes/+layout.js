
import { userStore, jobsStore, settingsStore } from "../stores/stores";
import { getSession } from "../lib/getSession";
export async function load() {
    console.log("load");
    const sessionData = await getSession();
    if (sessionData.success) {
        userStore.set(sessionData.user);
        jobsStore.set(sessionData.job);
        settingsStore.set(sessionData.settings);
    }
}
export const ssr = false;