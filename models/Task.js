const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
    task: String
});

module.exports = Task;