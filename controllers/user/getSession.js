const { getUserJobs } = require("../../datamodels/jobs");
const { getUserSettings } = require("../../datamodels/settings");
const { getUser } = require("../../datamodels/user");

const getSession = async (req, res, datamodels) => {

    if(!req.session.user) {
        res.json({success:false});
    } else {
        try {
            
            let user = await getUser(req.session.user);
            if(!user) {
                res.status(404).json({ success:false, error: "User not found." });
                return;
            }

            let settings = await getUserSettings(user.id);
            let jobs = await getUserJobs(user.id);

            console.log(jobs);

            res.json({
                success:true,
                user,
                settings,
                jobs
            });

        } catch(err) {
            console.error(err);
            res.status(500).json({error: "Internal server error."});
        }
    }

}

module.exports = getSession;