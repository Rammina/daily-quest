// Import JS files
import './shared.js';
import Navigation from './nav.js';
import Tasklist from './tasklist.js';

var navigation = new Navigation();
var tasklist = new Tasklist();

tasklist.render();
navigation.render();

navigation.renderProject("I want to hug you", [{title: "may", deadline: "7/8/19"}]);
// Next priority would be to render projects in the navigation bar
// Preferably with a for loop