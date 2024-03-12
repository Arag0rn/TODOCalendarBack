import { contactAddSchema, contactUpdateSchema, ContactFavoriteSchema } from "../schemas/contacts-schema.js";
import fs from "fs/promises";
import path from "path";
import TODO from "../models/Todo.js";
import {HttpError} from "../helpers/index.js"
import { ctrlWrapper } from "../decorators/index.js";

const postersPath = path.resolve("public", "avatar");

const getAllTodos = async (req, res, next) => {
   const {_id: owner} = req.user;
   const {page = 1, limit = 10}= req.query;
   const skip = (page - 1) * limit;
    const result = await TODO.find({owner}, "-createdAt -updatedAt", {skip, limit }).populate("owner", "username email");
    res.json(result)
 }

const getByID = async (req, res, next) => {

    const {contactId} = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOne({_id:contactId, owner});
    if(!result){
        throw HttpError (404, `Contact with id=${contactId} not found`);
    }
    res.json(result);

}

const searchByTitle = async (req, res, next) => {
      const {_id: owner} = req.user;
      const { title } = req.query;

      if (!title) {
        return res.status(400).json({ message: 'Title parameter is required' });
      }
      const regex = new RegExp(title, 'i');
      const result = await TODO.find({ owner, title: regex });
      res.status(200).json(result);
  };


const add = async (req, res, next) => {
    const {_id: owner} = req.user;
    const result = await TODO.create({...req.body, owner});
    res.status(201).json(result);
}


const updateById = async (req, res) => {
    const { todoId } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndUpdate({_id: todoId, owner}, req.body);
    if (!result) {
        throw HttpError(404, `Todo with id=${todoId} not found`);
    }

    res.json(result);
}

const deleteById = async (req, res) => {
    const { todoId } = req.params;
    const {_id: owner} = req.user;
    const result = await TODO.findOneAndDelete({_id: todoId, owner});

    if (!result) {
        throw HttpError(404, `TODO with id=${contactId} not found`);
    }

    res.status(204).send();

    res.json({
        message: "Delete success"
    })
}

const updatePositionTodo  = async(req, res, next)=>{
    try {
    //    const {error} = contactUpdateSchema.validate(req.body);
    //    if (error){
    //        throw HttpError(400, error.message);
    //    }
    const { todoId } = req.params;
    const {_id: owner} = req.user;
       console.log(todoId);
       const result = await TODO.findOneAndUpdate({_id: todoId, owner}, req.body, { new: true } )
       if(!result){
           throw HttpError (404, `Contact with id=${_id} not found`);
       }
       res.json(result);

    } catch (error) {
       next(error);
    }
   }


export default {
    getAllTodos: ctrlWrapper(getAllTodos),
    getByID: ctrlWrapper(getByID),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updatePositionTodo: ctrlWrapper(updatePositionTodo),
    searchByTitle: ctrlWrapper(searchByTitle),
}