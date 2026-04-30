const FeatureRequest = require('../models/FeatureRequest');
const Vote = require('../models/Vote');

exports.createFeatureRequest = async (req, res) => {
  try {
    const { title, description, targetProduct } = req.body;

    const feature = await FeatureRequest.create({
      title,
      description,
      targetProduct,
      createdBy: req.user._id
    });

    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeatureRequests = async (req, res) => {
  try {
    const features = await FeatureRequest.find()
      .populate('createdBy', 'username email')
      .sort({ votes: -1, createdAt: -1 });
    
    // Check if the current user has voted for each feature
    let featuresWithVoteStatus = features;
    
    if (req.user) {
      const userVotes = await Vote.find({ userId: req.user._id });
      const votedRequestIds = userVotes.map(v => v.requestId.toString());
      
      featuresWithVoteStatus = features.map(feature => {
        const featureObj = feature.toObject();
        featureObj.hasVoted = votedRequestIds.includes(feature._id.toString());
        return featureObj;
      });
    }

    res.status(200).json(featuresWithVoteStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.voteFeatureRequest = async (req, res) => {
  try {
    const featureId = req.params.id;
    const userId = req.user._id;

    // Check if already voted
    const existingVote = await Vote.findOne({ requestId: featureId, userId });

    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted for this feature' });
    }

    // Record the vote
    await Vote.create({ requestId: featureId, userId });

    // Increment feature vote count
    const feature = await FeatureRequest.findByIdAndUpdate(
      featureId,
      { $inc: { votes: 1 } },
      { new: true }
    );

    res.status(200).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFeatureStatus = async (req, res) => {
  try {
    const featureId = req.params.id;
    const { status } = req.body;

    if (!['pending', 'under_review', 'implemented'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const feature = await FeatureRequest.findByIdAndUpdate(
      featureId,
      { status },
      { new: true }
    );

    if (!feature) {
      return res.status(404).json({ message: 'Feature request not found' });
    }

    res.status(200).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
