const datamodels = require("../datamodels/datamodels");
const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const renderResume = require("./renderResume");
const renderCoverLetter = require("./renderCoverLetter");
const { mode } = require("../datamodels/settings");

process.on('message', async (message) => {
  
  try {

    const { jobId, outputId, textStyle } = message;
    if (!jobId) {
      process.send({ type: 'error', error: 'Invalid jobId' });
      return;
    }

    // Fetch job data from the database using the jobId
    const jobData = await datamodels.JobOutput.findOne({
      where: { job: jobId, id: outputId }
    });
    if (!jobData) {
      throw new Error('Job not found');
    }
    
    let htmlContent;
    if(jobData.mode === mode.RESUME) {
      htmlContent = renderResume(JSON.parse(jobData.output), textStyle);
    } else {
      htmlContent = renderCoverLetter(JSON.parse(jobData.output), textStyle);
    }

    // Define input and output file names for wkhtmltopdf
    const inputName = path.join(__dirname, `${jobId}.html`);
    const outputName = path.join(__dirname, `${jobId}.pdf`);

    // Write HTML content to a temporary file
    fs.writeFileSync(inputName, htmlContent);

    const command = 
      "wkhtmltopdf " 
      + "--page-size letter "
      + "-T 8mm -B 8mm -L 8mm -R 8mm "
      + "--disable-smart-shrinking "
      + "--background "
      + "--image-dpi 300 "
      + "--image-quality 90 "
      + "--no-stop-slow-scripts "
      + "--enable-external-links "
      + "--print-media-type "
      + "--encoding UTF-8 "
      + "--javascript-delay 300 "
      + inputName + " "
      + outputName + " ";
    
    exec(command, (error, stdout, stderr) => {
      
      if (error) {
        console.error(`exec error: ${error}`);
        process.send({ type: 'error', error });
        return;
      }
  
      // Read the generated PDF
      const pdfContent = fs.readFileSync(outputName);
  
      // Send the PDF content
      process.send({ type: 'pdf', data: pdfContent });
  
      // Clean up temporary files
      fs.unlinkSync(inputName);
      fs.unlinkSync(outputName);
      
    });
  } catch (error) {
    process.send({ type: 'error', error: error.message });
  }
});