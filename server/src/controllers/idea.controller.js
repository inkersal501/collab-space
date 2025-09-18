import { ideaService } from "../services/index.js";

const getIdeas = async (req, res) => {

    const {page, limit} = req.query;
    try {
        const data = await ideaService.getIdeas({page, limit});
        res.json(data);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const createIdea = async (req, res) => {
    const postedBy = req.user._id;
    const {idea} = req.body;
    try {
        const newIdea = await ideaService.createIdea({postedBy, idea});
        res.json(newIdea);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const updateIdea = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const deleteIdea = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const postLike = async (req, res) => { 
    const {id} = req.params; 
    const {_id} = req.user;

    try {
        const result = await ideaService.postLike(_id, id); 
        res.json({likes: result});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};
 

const postComment = async (req, res) => {
    const {id} = req.params;
    const {comment} = req.body;
    const {_id} = req.user;
    try {
        const result = await ideaService.postComment(_id, id, comment);
        res.json(result);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const removeComment = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const viewCount = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const collaborateRequest = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const collaborateRespond = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

export default {
  getIdeas,
  createIdea,
  updateIdea,
  deleteIdea,
  postLike,
  postComment,
  removeComment,
  viewCount,
  collaborateRequest,
  collaborateRespond,
};
