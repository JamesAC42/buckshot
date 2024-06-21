import postFetch from "./postFetch";

export const saveJobInput = async (job) => {

    try {
        const response = await postFetch("/api/saveJobInput", {
            job: job.id,
            title: job.title,
            personalInfo: job.personalInfo,
            jobInfo: job.jobInfo,
            requiredSections: job.requiredSections
        });
    
        if(response.success) {
            return true;
        } else {
            console.error(response.message);
            return false;
        }
    } catch(err) {
        console.error(err);
        return false;
    }

}

export const saveJobTitle = async (job, title) => {
    
    try {
        const response = await postFetch("/api/saveJobTitle", {
            job,
            title
        });
    
        if(response.success) {
            return true;
        } else {
            console.error(response.message);
            return false;
        }
    } catch(err) {
        console.error(err);
        return false;
    }
}

export const saveJobPersonalInfo = async (job, personalInfo) => {

    try {
        const response = await postFetch("/api/saveJobPersonalInfo", {
            job,
            personalInfo
        });
    
        if(response.success) {
            return job;
        } else {
            console.error(response.message);
            return false;
        }
    } catch(err) {
        console.error(err);
        return false;
    }
}

export const saveJobJobInfo = async (job, jobInfo) => {

    try {
        const response = await postFetch("/api/saveJobJobInfo", {
            job,
            jobInfo
        });
    
        if(response.success) {
            return job;
        } else {
            console.error(response.message);
            return false;
        }
    } catch(err) {
        console.error(err);
        return false;
    }
}

export const saveJobRequiredSections = async (job, requiredSections) => {

    try {
        const response = await postFetch("/api/saveJobRequiredSections", {
            job,
            requiredSections
        });
    
        if(response.success) {
            return true;
        } else {
            console.error(response.message);
            return false;
        }
    } catch(err) {
        console.error(err);
        return false;
    }
}