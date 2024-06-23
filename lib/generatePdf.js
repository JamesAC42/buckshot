const datamodels = require("../datamodels/datamodels");
const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');
const os = require('os');
const path = require('path');

process.on('message', async (message) => {
  try {
    // Fetch job output from database
    const job = await datamodels.JobOutput.findByPk(message.jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    // Generate PDF
    const pdf = await mdToPdf({ content: job.output });
    
    // Create temp file
    const tempFilePath = path.join(os.tmpdir(), `job_${message.jobId}.pdf`);
    fs.writeFileSync(tempFilePath, pdf.content);

    // Read file and send back to parent process
    const pdfBuffer = fs.readFileSync(tempFilePath);
    process.send({ type: 'pdf', data: pdfBuffer });

    // Clean up temp file
    fs.unlinkSync(tempFilePath);
  } catch (error) {
    process.send({ type: 'error', error: error.message });
  }
});