const datamodels = require("../datamodels/datamodels");
const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

process.on('message', async (message) => {
  
  try {

    const tempHtmlFile = path.join(__dirname, 'temp.html');
    const tempPdfFile = path.join(__dirname, 'output.pdf');
  
    // Write HTML content to a temporary file
    fs.writeFileSync(tempHtmlFile, htmlContent);

    const command = 
      "wkhtmltopdf --page-size letter "
      + "--margin-top 10mm "
      + "--margin-left 10mm "
      + "--margin-right 10mm "
      + "--margin-bottom 10mm "
      + "--disable-smart-shrinking "
      + "--background "
      + "--enable-external-links "
      + "--encoding UTF-8"
      + inputName + " "
      + outputName + " "
    
    exec(command, (error, stdout, stderr) => {
      
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send('Error generating PDF');
      }
  
      // Read the generated PDF
      const pdfContent = fs.readFileSync(tempPdfFile);
  
      // Set headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
  
      // Send the PDF content
      res.send(pdfContent);
  
      // Clean up temporary files
      fs.unlinkSync(tempHtmlFile);
      fs.unlinkSync(tempPdfFile);
      
    });
  } catch (error) {
    process.send({ type: 'error', error: error.message });
  }
});