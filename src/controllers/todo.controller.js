import { createTaskService } from "../services/todo.service.js";
import { readTaskService } from "../services/todo.service.js";
import { updateTaskService } from "../services/todo.service.js";
import { deleteTaskService } from "../services/todo.service.js";

export const createTask = async (req, res) => {
    try {
        const result = await createTaskService(req.body, req.user.id);

        res.status(201).json(result);

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

export const readTask = async ( req, res) => {
    try{
        const result = await readTaskService(req.user.id);

        res.status(200).json(result);

    }
    catch (error){
        res.status(error.statusCode || 500).json({
            message: error.message,
        });

    }
};

    export const updateTask = async ( req, res) => {
        try{
            const result = await updateTaskService ( req.params.id, req.body, req.user.id );

            res.status(200).json(result);
        }
        catch(error){
            res.status(error.statusCode || 500).json({
                message : error.message,
            })
        }
    }

    export const deleteTask = async ( req, res ) => {
        try{
            const result = await deleteTaskService ( req.params.id, req.user.id );

            res.status(200).json(result);
        }
        catch (error){
            res.status(error.statusCode || 500).json({
                message : error.message
            })
        }
        
    }