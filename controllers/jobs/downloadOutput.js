const {fork} = require("child_process");

const downloadOutput = (req, res) => {

  const jobId = req.params.jobId;
  const userId = req.session.user;
  if(!jobId || !userId) {
    return res.status(400).json({ success: false, message: "Invalid session. "});
  }
  
  const child = fork('./lib/generatePdf.js');
  
  child.on('message', (message) => {
    if (message.type === 'pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="job_${jobId}.pdf"`);
      res.send(message.data);
      child.kill();
    } else if (message.type === 'error') {
      res.status(500).json({ error: message.error });
      child.kill();
    }
  });
  
  child.send({ jobId });

}

module.exports = downloadOutput;