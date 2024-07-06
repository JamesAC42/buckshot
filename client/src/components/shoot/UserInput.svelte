<script>
    import TextArea from "../../components/TextArea.svelte";

    import { jobsStore } from "../../stores/stores";
    import { onDestroy, onMount } from 'svelte';

    import { saveJobPersonalInfo, saveJobJobInfo } from "$lib/saveJobInput";

    export let activeJob = "";
    let previousActiveJob = activeJob;

    let jobs = null;
    let unsubscribe = null;

    let personalInfo = "";
    let jobInfo = "";

    onMount(() => {
        unsubscribe = jobsStore.subscribe(value => {
            jobs = value;
            if(jobs && jobs[activeJob]) {
                personalInfo = jobs[activeJob].personalInfo;
                jobInfo = jobs[activeJob].jobInfo;
            }
        });
    });

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe();
        }
    });

    async function savePersonalInfo() {
        if(personalInfo.length > 10000) return;
        let newPersonalInfo = personalInfo;
        let job = activeJob;
        jobsStore.update((oldJobs) => {
            if(!oldJobs) return null;
            if(oldJobs[job]) {
                oldJobs[job].personalInfo = newPersonalInfo;
            }
            return oldJobs;
        });
        await saveJobPersonalInfo(activeJob, newPersonalInfo);
    }
    
    async function saveJobInfo() {
        if(jobInfo.length > 10000) return;
        let newJobInfo = jobInfo;
        let job = activeJob;
        jobsStore.update(oldJobs => {
            if(!oldJobs) return null;
            if(oldJobs[job]) {
                oldJobs[job].jobInfo = newJobInfo;
            }
            return oldJobs;
        });
        await saveJobJobInfo(activeJob, newJobInfo);
    }

    $: if (activeJob !== previousActiveJob) {
        personalInfo = jobs && jobs[activeJob] ? jobs[activeJob].personalInfo : "";
        jobInfo = jobs && jobs[activeJob] ? jobs[activeJob].jobInfo : "";
        previousActiveJob = activeJob; 
    } 

</script>

<p>
    Enter information about yourself here. Just list out the important points —
    no need for polished sentences or perfect grammar. Buckshot will handle the
    rewording for you. Simply provide a straightforward list of your
    qualifications, such as education, work history, skills, notable
    accomplishments, and anything else you would like to include. <span class="emphasis">Be as specific 
    as possible when necessary -</span> key points to include are your name, any contact 
    info you need present, company names, school names, links, dates, etc.
</p>
<TextArea
    bind:value={personalInfo}
    onBlur={savePersonalInfo}
    placeholder="E.g., 'Software engineer, Master's in Computer Science, cloud computing certification, led 10-person developer team.'"
/>

<div class="spacer"></div>

<p>
    Provide specific details about the job role you are applying for, including
    required qualifications, skills, and work experience as outlined in the job
    description. Additionally, you may include insights into the company's
    culture, values, and mission to tailor your application more closely to the
    organization. Feel free to just copy paste from LinkedIn or wherever the
    details are from.
</p>
<TextArea
    bind:value={jobInfo}
    onBlur={saveJobInfo}
    placeholder="E.g., 'Seeking a seasoned graphic designer with a minimum of 5 years experience in brand development, proficient in Adobe Creative Suite, and familiar with web design principles. The ideal candidate aligns with our company's commitment to sustainability and innovation.'"
/>

<style lang="scss">

    @import "../../styles/mixins.scss";

    p {
        margin: 1rem 0;
        color: $primary-color;
        span.emphasis {
            font-weight:600;
        }
    }
</style>
