function serializeJobInput(jobs) {
    const jobIds = Object.keys(jobs);
    const newJobs = {};
    for(let i = 0; i < jobIds.length; i++) {
        newJobs[jobIds[i]] = {
            ...jobs[jobIds[i]],
            requiredSections: JSON.parse(jobs[jobIds[i]].requiredSections)
        }
    }
    return newJobs;
}
export default serializeJobInput;