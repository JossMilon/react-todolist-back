const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
require('dotenv').config;

const app = express();
app.use(formidable());

mongoose.connect(process.env.MONGO_DB_URI);

// Importing Task
const Task = require("./models/Task");

app.get("/", (req, res) => {
    res.status(200).json("Hello world")
});

app.post("/add-task", async (req, res) => {
    try{
        console.log(req.fields.task)
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

app.all("*", (req, res) => {
    res.status(404).json({error: "page not found"})
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server has started...")
});