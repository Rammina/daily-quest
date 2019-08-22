// Import JS files
import './shared.js';
import Navigation from './nav.js';
import Tasklist from './tasklist.js';

var navigation = new Navigation();
var tasklist = new Tasklist();

tasklist.render();
navigation.render();

Navigation.renderProject("I want to hug you", [{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"}, 
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"}
]);

Navigation.renderProject("I want to hug you", [{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"}, 
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"}
]);

Navigation.renderProject("I want to hug you", [{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"}, 
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"},
	{title: "may", description: "May is my best girl.", priority: "high", date: "7/8/19"}
]);
// Next priority would be to render projects in the navigation bar
// Preferably with a for loop

document.getElementById("tasklist-projects-button").addEventListener("click", function(){
	Navigation.showMenu();
	Navigation.showProject();
});