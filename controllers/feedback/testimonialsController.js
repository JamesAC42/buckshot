const {
    getTestimonials,
    addTestimonial,
    deleteTestimonial,
    testimonialExists,
    isUserAdmin,
    isUserMuted
} = require('../../datamodels/feedback.js');
const { getUser } = require('../../datamodels/user.js');

const getTestimonialsController = async (req, res) => {
    try {
        const testimonials = await getTestimonials();
        res.status(200).json({ success: true, data: testimonials });
    } catch (err) {
        console.error('Error fetching testimonials:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const addTestimonialController = async (req, res, redis) => {

    let { name, comment } = req.body;

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    if (!comment) {
        return res.status(400).json({ success: false, message: 'Name and comment are required.' });
    }
    
    if(name && name.length > 50) {
        return res.status(400).json({ success: false, message: 'Name too long.' });
    }

    if(comment.length > 500) {
        return res.status(400).json({ success: false, message: "Comment too long." });
    }

    try {
    
        if (!name) {
            const user = await getUser(req.session.user);
            if (user) {
                name = user.username;
            } else {
                return res.status(404).json({ success: false, message: 'User not found.' });
            }
        }
    
        const existingTestimonial = await testimonialExists(req.session.user);
        if (existingTestimonial) {
            return res.status(400).json({ success: false, message: 'User has already submitted a testimonial.' });
        }

        const isMuted = await isUserMuted(req.session.user, redis);
        if(isMuted) {
            return res.status(400).json({ success: false, message: "You are muted." });
        }

        const newTestimonial = await addTestimonial(req.session.user, name, comment);
        res.status(201).json({ success: true, data: newTestimonial });

    } catch (err) {
        console.error('Error adding testimonial:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const deleteTestimonialController = async (req, res, redis) => {
    
    const { id } = req.params;

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }
    
    const isAdmin = await isUserAdmin(req.session.user, redis);
    if(!isAdmin) {
        return res.status(401).json({ success: false, message: 'Invalid permissions.' });
    }

    try {
        const result = await deleteTestimonial(id);
        if (result === 0) {
            return res.status(404).json({ success: false, message: 'Testimonial not found.' });
        }
        res.status(200).json({ success: true, message: 'Testimonial deleted successfully.' });
    } catch (err) {
        console.error('Error deleting testimonial:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    getTestimonialsController,
    addTestimonialController,
    deleteTestimonialController
};