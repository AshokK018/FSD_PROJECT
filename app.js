const express = require("express");
const bodyParser = require("body-parser");
const schedule = require("node-schedule");

const app = express();
const tasks = [];
const completedTasks = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.render("index", { tasks, completedTasks });
});

app.post("/add", (req, res) => {
    const { task, time } = req.body;

    // Add task to list
    const taskEntry = { task, time };
    tasks.push(taskEntry);

    // Schedule the task
    schedule.scheduleJob(time, () => {
        completedTasks.push(taskEntry);
        tasks.splice(tasks.indexOf(taskEntry), 1);
        console.log(`Task "${task}" executed at ${time}`);
    });

    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
