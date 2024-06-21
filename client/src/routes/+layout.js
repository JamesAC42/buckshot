
import { userStore, jobsStore, settingsStore } from "../stores/stores";
import { getSession } from "../lib/getSession";
import serializeJobInput from "../lib/serializeJobInput";
export async function load() {
    const sessionData = await getSession();
    if (sessionData.success) {
        userStore.set(sessionData.user);
        let jobs = sessionData.jobs;
        const newJobs = serializeJobInput(jobs);
        jobsStore.set(newJobs);
        settingsStore.set(sessionData.settings);
    }
}
export const ssr = false;