const datamodels = require("../datamodels/datamodels");
const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');
const os = require('os');
const path = require('path');

process.on('message', async (message) => {
  try {
    // Fetch job output from database
    console.log(message);
    const job = await datamodels.JobOutput.findOne({where: {
        job: message.jobId
    }});
    console.log(job);
    if (!job) {
      //throw new Error('Job not found');
    }

    console.log("generating pdf");
    // Generate PDF
    const pdf = await mdToPdf({ content: '# Hello, World' }).catch(console.error);
    console.log(pdf);
    console.log("finished generating pdf");
    
    // Create temp file
    //const tempFilePath = path.join(os.tmpdir(), `job_${message.jobId}.pdf`);
    const tempFilePath = path.join(os.tmpdir(), `job_.pdf`);
    fs.writeFileSync(tempFilePath, pdf.content);
    
    console.log("reading file and sending back");
    // Read file and send back to parent process
    const pdfBuffer = fs.readFileSync(tempFilePath);
    process.send({ type: 'pdf', data: pdfBuffer });
    console.log("sent back");

    // Clean up temp file
    fs.unlinkSync(tempFilePath);
  } catch (error) {
    process.send({ type: 'error', error: error.message });
  }
});