const {fork} = require("child_process");
const { validateJob } = require("../../datamodels/jobs");

const downloadOutput = async (req, res, datamodels) => {

  let jobId = req.query.jobId;
  let outputId = req.query.outputId;
  let textStyle = req.query.textStyle; 
  const userId = req.session.user;
  if(!userId) {
    return res.status(400).json({ success: false, message: "Invalid session. "});
  }
  
  if(!jobId || !outputId || !textStyle) {
    return res.status(400).json({ success: false, message: "Invalid schema. Job, output ID, and text style are required."});
  }

  outputId = parseInt(outputId);
  if (isNaN(outputId)) {
    return res.status(400).json({ success: false, message: "Output ID must be a number." });
  }

  if(textStyle !== "serif" && textStyle !== "sans-serif") {
    return res.status(400).json({ success: false, message: "Invalid text style provided."});
  }
  
  const validJob = await validateJob(userId,jobId);
  if(!validJob) {
    return res.status(400).json({ success: false, message: "Invalid job." });
  }

  const jobOutput = await datamodels.JobOutput.findOne({
    where: { job: jobId, id: outputId }
  });

  if (!jobOutput) {
    return res.status(400).json({ success: false, message: "Invalid job output." });
  }
  
  const child = fork('./lib/generatePdf.js');
  
  child.on('message', (message) => {
    if (message.type === 'pdf') {
      
      const pdfBuffer = Buffer.from(message.data);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="job_${jobId}.pdf"`);
      res.setHeader('Content-Length', pdfBuffer.length);
      
      res.send(pdfBuffer);

      child.kill();

    } else if (message.type === 'error') {
      res.status(500).json({ error: message.error });
      child.kill();
    }
  });
  
  child.send({ jobId, outputId, textStyle });

}

module.exports = downloadOutput;