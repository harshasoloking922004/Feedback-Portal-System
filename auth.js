const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const { title, description, category, targetProduct } = req.body;

    const feedback = await Feedback.create({
      title,
      description,
      category,
      targetProduct,
      createdBy: req.user._id
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
