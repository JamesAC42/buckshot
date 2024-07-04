import { writable } from 'svelte/store';

export const userStore = writable(null);
/*
{
    id: uuid,
    username: string,
    dateCreated: date,
    premium: bool,
    remainingGenerations: number,
    email: string
}
*/

export const jobsStore = writable(null);
/*
{
    [id]: {
        title: string,
        personalInfo: string,
        jobInfo: string,
        requiredSections: Array<string>,
        output: {
            [id]: string
        }
    }
}
*/

export const settingsStore = writable(null);
/*
{
    tone: string,
    copyPersonalInfo: bool,
    model: string,
    mode: string
}
*/