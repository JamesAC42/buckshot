const { validateJob } = require("../../datamodels/jobs");
const {escape} = require("html-escaper");

const validateString = (string) => { 
    return typeof(string) === "string" && string.trim().length > 0 && string.length < 5000;
}

const validateArrayStructure = (array, structure) => {
    return array.every(item => {
        return Object.keys(structure).every(key => {
            if (structure[key] === "string") {
                return validateString(item[key]);
            }
            return typeof item[key] === structure[key];
        });
    });
};

const validateArrayOfStrings = (array) => {
    return array.every(item => validateString(item));
};

const validateWorkHistory = (content) => {
    return validateArrayStructure(content, {
        position: "string",
        company: "string",
        dates: "string",
        description: "object"
    }) && content.every(item => validateArrayOfStrings(item.description));
}

const validateEducation = (content) => {
    return validateArrayStructure(content, {
        school: "string",
        dates: "string",
        major: "string",
        description: "object"
    }) && content.every(item => validateArrayOfStrings(item.description));
}

const cleanContent = (data) => {
    if (typeof data === 'string') {
        return escape(data.trim());
    } else if (Array.isArray(data)) {
        return data.map(cleanContent);
    } else if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [cleanContent(key), cleanContent(value)])
        );
    }
    return data;
};

// Specific validation for complex structures
const sectionValidators = {
    "name": validateString,
    "summary": validateString,
    "objective": validateString,
    "contact info": (content) => validateArrayStructure(content, { label: "string", info: "string" }),
    "education":  validateEducation,
    "work history": validateWorkHistory,
    "skills": (content) => typeof content === "object" && Object.values(content).every(validateArrayOfStrings),
    "projects": (content) => validateArrayStructure(content, { name: "string", description: "string" }),
    "volunteering": validateArrayOfStrings,
    "certifications": validateArrayOfStrings,
    "awards": validateArrayOfStrings,
    "academic achievements": validateArrayOfStrings,
    "references": validateArrayOfStrings,
    "hobbies": validateArrayOfStrings,
    "websites": validateArrayOfStrings,
    "other stuff": validateArrayOfStrings,
    "greeting": validateString,
    "body": validateString,
    "signature": validateString
};

const editSectionContent = async (req, res, datamodels) => {

    const { name, content, job, outputId } = req.body;
    const userId = req.session.user;

    // Validate that name and content are present in the request body
    if (!name || !content) {
        return res.status(400).json({ success: false, message: "Name and content are required." });
    }

    // Validate that the user is logged in
    if (!userId) {
        return res.status(401).json({ success: false, message: "User not logged in." });
    }

    const letterSections = ["greeting", "body", "signature"];

    // Validate user owns the job
    const ownsJob = await validateJob(userId, job);
    if (!ownsJob) {
        return res.status(403).json({ success: false, message: "User does not own the job." });
    }

    // Get jobOutput from job and outputId
    const jobOutput = await datamodels.JobOutput.findOne({ where: { job: job, id: outputId } });
    if (!jobOutput) {
        return res.status(404).json({ success: false, message: "Job output not found." });
    }

    // Validate the outputMode matches the section name
    const outputMode = jobOutput.mode;
    if (outputMode === 2 && !letterSections.includes(name)) {
        return res.status(400).json({ success: false, message: "Invalid section name for letter mode." });
    } else if (outputMode === 1 && !Object.keys(sectionValidators).includes(name)) {
        return res.status(400).json({ success: false, message: "Invalid section name for resume mode." });
    }

    const cleanedContent = cleanContent(content);
    console.log(cleanedContent);

    if(!sectionValidators[name](cleanedContent)) {
        return res.status(400).json({ success: false, message: "Invalid content format provided." });
    }

    // Parse the output as JSON
    let output;
    try {
        output = JSON.parse(jobOutput.output);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to parse job output." });
    }

    // Stringify the given content and set the property (name) in the output
    if(name === "body") {
        output[name] = cleanedContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    } else if (name === "signature") {
        const lines = cleanedContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const name = lines.pop();
        const signoff = lines.join(' ');
        output[name] = { signoff, name };
    } else {
        output[name] = cleanedContent;
    }

    console.log(output);

    // Save back to the output in db
    try {
        await datamodels.JobOutput.update({ output: JSON.stringify(output) }, { where: { id: outputId, job: job } });
        return res.status(200).json({ success: true, message: "Section content updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update job output." });
    }
};

module.exports = editSectionContent;