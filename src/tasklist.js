import '!style-loader!css-loader!./tasklist.css';

import TaskData from './taskdata.js';
import Modal from './modal.js';
import RoboImage from './images/yumemi.png';


class Tasklist {
	render(){
		let tasklistSection = document.createElement("section");
		tasklistSection.id = "tasklist-container";
		tasklistSection.insertAdjacentHTML("beforeend", `
				<div id="tasklist-content">
                	<div id="tasklist-text">
						
						<div id="tasklist-girl-container">

						</div>
						<div id="tasklist-paragraph-container">
							<p id="tasklist-paragraph">Check your <button id="tasklist-projects-button" class="tasklist-paragraph-button"> Projects</button> for tasks you have to finish. <br class="linebreak-hide-mobile"> The <button id="tasklist-due-today-button" class="tasklist-paragraph-button">Due Today</button> section contains urgent tasks. <br class="linebreak-hide-mobile"> Do your best!</p>
						</div>
                	</div>
	            </div>

		`);
		tasklistSection.style.display = "block";
		// let paragraphContainer = tasklistSection.querySelector("#tasklist-paragraph-container");
		// paragraphContainer.style.background = `url(${ChatBubble})`;
		// paragraphContainer.style.backgroundSize = 'cover';
		// paragraphContainer.style.backgroundRepeat = 'no-repeat';
		// paragraphContainer.style.backgroundPosition = '50% 50%';

		let girlContainer = tasklistSection.querySelector("#tasklist-girl-container");
		girlContainer.style.background = `url(${RoboImage})`;
		girlContainer.style.backgroundSize = 'contain';
		girlContainer.style.backgroundRepeat = 'no-repeat';
		girlContainer.style.backgroundPosition = '50% 50%';
		document.querySelector("main").appendChild(tasklistSection);

	}
	// task is an object that contains information about a task
	static renderTask(task){

		let taskElement = document.createElement("li");
		taskElement.classList.add("tasklist-task");

		// Check the priority of the task and give it the appropriate class
		if(task.priority === 'high') {			
			taskElement.classList.add("high");
		}
		else if(task.priority === 'medium') {			
			taskElement.classList.add("medium");
		}
		else if(task.priority === 'low'){
			taskElement.classList.add("low");
		}
		taskElement.insertAdjacentHTML("beforeend", `
			<div class="checkbox-title-div">
				<input class="tasklist-checkbox" type="checkbox" name="finished" checked="${task.checked}">
				<span class="tasklist-title">${task.title}</span>
			</div>
			<span class="date-time-span">
				<span class="tasklist-date">${task.date} </span>
				<span class="time-hide-mobile"> - ${task.time}</span>
			</span>
			
		`);
		
		// Add Event listener for click to display task information
		taskElement.addEventListener("click", function(){

			Modal.renderTaskDescriptionModal(task);
		});

		// Check if the container exists before inserting
		// If it is not, just make a new one first then insert
		let taskContainer = document.querySelector(".tasklist-tasks");
		if(taskContainer) {
			taskContainer.insertBefore(taskElement, taskContainer.firstChild);
		}
		else{
			taskContainer = document.createElement("ul");
			taskContainer.classList.add("tasklist-tasks");
			taskContainer.insertBefore(taskElement, taskContainer.firstChild);

			let groupContainer = document.querySelector(".tasklist-group-container");
			groupContainer.insertBefore(taskContainer, groupContainer.firstChild);
		}
	}
	// The arguments are:
	// the title of the project ( used as a header )
	// The data structure ( an array of objects(tasks) )
	static renderTasks(projectTitle, projectTasks){

		let tasklistSection = document.getElementById("tasklist-container");
		// Get rid of any existing group container if there are any
		// This is done to prevent any duplicates or stacking
		if(document.querySelector(".tasklist-group-container")) {

			tasklistSection.removeChild(document.querySelector(".tasklist-group-container"));
		}

		// Create the content to be added and add the classes
		let content = document.createElement("div");
		content.classList.add("tasklist-group-container");
		// Check if the navigation menu is opened
		// add padding necessary if so
		if(tasklistSection.classList.contains("show-menu")){		
			content.classList.add("show-menu");
		}
		content.insertAdjacentHTML("beforeend", `			
			<div class="tasklist-group-content">
				<div class="tasklist-spine">
					<h2 class="tasklist-group-header">${projectTitle}</h2>
					<button class="tasklist-add-button">+</button>
				</div>
				<ul class="tasklist-tasks">
					
				</ul>
			</div>
		`);
		let taskElementContainer = content.querySelector(".tasklist-tasks");
		// Generate a list item for every task
		for (let task of projectTasks){
			if(task.priority === undefined){
				task.priority = "low";
			}
			if(task.time === undefined){
				task.time = "11:59PM";
			}

			let taskElement = document.createElement("li");
			taskElement.classList.add("tasklist-test");
			taskElement.classList.add(task.priority);
			taskElement.insertAdjacentHTML("beforeend", `
			<li class="tasklist-task ${task.priority}">
				<div class="checkbox-title-div">
					<input class="tasklist-checkbox" type="checkbox" name="finished" checked="${task.checked}">
					<span class="tasklist-title">${task.title}</span>
				</div>
				<span class="date-time-span">
					<span class="tasklist-date">${task.date} </span>
					<span class="time-hide-mobile"> - ${task.time}</span>
				</span>
			</li>
			`);	
			taskElement.addEventListener("click", function(){
			
				Modal.renderTaskDescriptionModal(task);

				let editButton = document.getElementById("task-details-edit");
				let deleteButton = document.getElementById("task-details-delete");
				let cancelButton = document.getElementById("task-details-cancel");
				// Listener for edit task button
				editButton.addEventListener("click", function(event){
					event.preventDefault();

					editButton.id = "task-details-submit";
					let submitButton = document.getElementById("task-details-submit");
					submitButton.classList.add("form-submit");
					submitButton.textContent = "Apply Changes";

					deleteButton.classList.add("hide");
					cancelButton.classList.remove("hide");

					// transform the disabled buttons into enabled ones
					let inputFields =  document.querySelectorAll(".task-details-modal-required");
					for (let input of inputFields){
						input.disabled = false;

					}
				});

			});
			taskElementContainer.insertBefore(taskElement, taskElementContainer.firstChild);
			

		}
		

		function openAddTaskModal() {
			Modal.renderAddTaskModal();

			
			// add listeners to each input field
			let requiredAddTaskInputs = document.querySelectorAll(".add-task-modal-required");
			let dateField = document.getElementById("add-task-date-field");
			let timeField = document.getElementById("add-task-time-field");
			for (let input of requiredAddTaskInputs){
				input.addEventListener("blur", function(){
					// Restrict the date and time fields to only accept dates/times from today onwards
					if(input === dateField) {
						Modal.validAddTaskDate(input);
						return;
					}
					else if(input === timeField){
						Modal.validAddTaskTime(input);
						return;
					}
					if(Modal.emptyFieldError(input)) {return;}

					
				});				
			}

			// Handle the rendering upon submitting a task
			document.getElementById("add-task-submit").addEventListener("click", function(event){
				event.preventDefault();
				// Check if the form values are valid before running
				if(Modal.validAddTaskForm()) {
					// Submit if valid
					let task = Modal.retrieveAddTaskData();	
					Tasklist.renderTask(task);	

					let projectTitle = document.querySelector(".tasklist-group-header").textContent;
					TaskData.addTask(projectTitle, task);

					Modal.deleteModal(document.getElementById("add-task-backdrop"));
				}
				
				
			});
		}
		

		content.querySelector(".tasklist-add-button").addEventListener("click", function(){
			openAddTaskModal();

		});
		tasklistSection.appendChild(content);
	}

	static hideTasklist(){
		let tasklistSection = document.getElementById("tasklist-container");
		if(document.querySelector(".tasklist-group-container")) {
			tasklistSection.removeChild(document.querySelector(".tasklist-group-container"));
		}
	}
	remove(){
		let tasklistSection = document.getElementById("tasklist-container");
		tasklistSection.parentElement.removeChild(tasklistSection);
		// tasklistSection.style.display = "none";
		console.log("tasklist remove Activated");
	}
}

export default Tasklist;
