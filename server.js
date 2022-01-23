const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config;

const app = express();
app.use(cors());
app.use(formidable());

mongoose.connect(process.env.MONGO_DB_URI || "mongodb://localhost/reacttodolist");

// Importing Task
const Task = require("./models/Task");

app.get("/", async (req, res) => {
    try {
        const taskArray = await Task.find()
        const response = taskArray.map((item) => {return item.task});
        res.status(200).json(response)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
});

app.post("/add-task", async (req, res) => {
    try{
        const newTask = new Task({
            task: req.fields.task
        });
        await newTask.save();
        res.status(200).json(`${req.fields.task} added`);
    }
    catch(error) {
        res.status(400).json({error: error.message});
    }
});

app.post("/delete-task", async (req, res) => {
    try {
        await Task.deleteOne({task: req.fields.task});
        res.status(200).json("Task deleted");
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
});

app.all("*", (req, res) => {
    res.status(404).json({error: "page not found"})
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server has started...")
});