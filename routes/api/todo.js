import todoController from '../../controllers/todo-controller.js'


import express from 'express';

import {isEmptyBody, isValidId, authenticate, upload} from "../../middlewares/index.js";



const todoRouter = express.Router();

todoRouter.use(authenticate);

todoRouter.get('/',  todoController.getAllTodos);

todoRouter.get('/:title',  todoController.searchByTitle);

todoRouter.get('/:todoId', isValidId, todoController.getByID);

todoRouter.post('/',  isEmptyBody, todoController.add);

todoRouter.patch("/:todoId", todoController.updatePositionTodo)

todoRouter.delete('/:todoId', todoController.deleteById)

todoRouter.put('/:todoId', isEmptyBody, todoController.updateById);

export default todoRouter;
