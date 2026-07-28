import { where } from "sequelize";
import Todo from "../models/todo.model.js";
import express from "express";

export const createTaskService = async (taskData, userId) => {
    const { task, description } = taskData;

    if (!task) {
        const error = new Error("Task is required");
        error.statusCode = 400;
        throw error;
    }

    const newTask = await Todo.create({
    task,
    description,
    userId, 
    });

    return {
    message: "Task created successfully.",
    task: newTask,
    };

};

export const readTaskService = async (userId) =>{
    const tasks = await Todo.findAll({
        where : {
            userId,
        }
    });

    return {
        message : "Task fetched successfully.",
        tasks : tasks,  
    };
}

export const updateTaskService = async (id, taskData, userId) => {
    const task = await Todo.findOne({
        where : {
            id, 
            userId,
        }
    });

    if (!task) {
        const error = new Error ("Task not Found");
        error.statusCode = 404;
        throw error
    }

    task.task = taskData.task ?? task.task;
    task.description = taskData.description ?? task.description;
    task.completed = taskData.completed ?? task.completed;

    await task.save();

    return{
        message: "Task Updated Successfully",
        task,
    };

}

    export const deleteTaskService = async (id, userId) => {
        const task = await Todo.findOne({
            where: {
                id, userId
            }
        })

        if (!task){
            const error = new Error ("Task not found");
                error.statusCode = 404;
                throw error;
            
        }

        await task.destroy();

        return {
            message: "Task Deleted Successfully",
            
        }
    }

