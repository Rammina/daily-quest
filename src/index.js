// Import JS files
import "./shared.js";
import TaskData from "./taskdata.js";
import Navigation from "./nav.js";
import Tasklist from "./tasklist.js";

const navigation = new Navigation();
const tasklist = new Tasklist();

tasklist.render();
navigation.render();

let testProject = [
	{ title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19" },
	{ title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19" },
	{ title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19" },
	{ title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19" },
	{ title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19" },
	{ title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19" },
	{ title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19" },
	{ title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19" },
	{ title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19" },
	{ title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19" }
];

let testProjectTitle = "I want to hug you";
let newProject = TaskData.addProject(testProjectTitle, testProject);
Navigation.renderProject(newProject);

// Next priority would be to render projects in the navigation bar
// Preferably with a for loop

document.getElementById("tasklist-projects-button").addEventListener("click", function() {
	Navigation.showMenu();
	Navigation.showProject();
});
