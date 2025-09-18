import { ideaModel } from "../models/index.js";

const getIdeas = async ({ page = 1, limit = 10 }) => {
  try {
    const skip = (page - 1) * limit;

    const [ideas, total] = await Promise.all([
      ideaModel.find({}).populate("postedBy", "username avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ideaModel.countDocuments()
    ]);

    return {
      ideas,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      hasNextPage: page * limit < total,
    };
  } catch (error) {
    throw new Error("Failed to fetch ideas");
  }
};


const createIdea = async (data) => {
    try {
        return await ideaModel.create(data);
    } catch (error) {
        throw new Error(`Failed to post idea. ${error.message}`);
    } 
};


const updateIdea = async () => {
    try {
        
    } catch (error) {
        throw new Error("");
    } 
};


const deleteIdea = async () => {
    try {
        
    } catch (error) {
        throw new Error("");
    } 
};


const postLike = async (userId, ideaId) => {
 
    try {
        const idea = await ideaModel.findById(ideaId);

        if (!idea) throw new Error("Idea not found.");
        const alreadyLiked = idea.likes.includes(userId);
        if (alreadyLiked) {
            idea.likes.pull(userId);
        } else {
            idea.likes.push(userId);
        }   
        
        await idea.save(); 
        return idea.likes.length;
    } catch (error) {
        throw new Error("Failed to like.");
    } 
};

const getMyLikes = async (userId) => {
    try {
        const likedIdeas = await ideaModel.find({likes: userId}).select("_id").sort({createdAt: -1}).lean();
        return likedIdeas.map(doc => doc._id);
    } catch (error) {
        throw new Error("Failed to get likes.");
    }
} 

const postComment = async (userId, ideaId, comment) => {
    try {
        const idea = await ideaModel.findById(ideaId);
        if (!idea) throw new Error("Idea not found.");
        idea.comments.push({text: comment, commentedBy: userId});
        await idea.save();
        return {text: comment, commentedBy: userId};
    } catch (error) {
        throw new Error("Failed to comment.");
    } 
};

const removeComment = async () => {
    try {
        
    } catch (error) {
        throw new Error("");
    } 
};

const viewCount = async () => {
    try {
        
    } catch (error) {
        throw new Error("");
    } 
};

const collaborateRequest = async () => {
    try {
        
    } catch (error) {
        throw new Error("");
    } 
};

const collaborateRespond = async () => {
    try {
        
    } catch (error) {
        throw new Error("");
    } 
};
 

export default {
    getIdeas, createIdea, updateIdea, deleteIdea, 
    postLike, getMyLikes, postComment, removeComment, 
    viewCount, collaborateRequest, collaborateRespond
};