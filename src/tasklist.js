import {format} from 'date-fns';

import '!style-loader!css-loader!./tasklist.css';

import standardToMilitary from './timeconverter.js';
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

		let taskElementContainer = document.querySelector(".tasklist-tasks");
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
				<input class="tasklist-checkbox" type="checkbox" name="finished">
				<span class="tasklist-title">${task.title}</span>
			</div>
			<span class="date-time-span">
				<span class="tasklist-date">${task.date} </span>
				<span class="time-hide-mobile tasklist-time"> - ${task.time}</span>
			</span>
			
		`);
		
		let checkbox = taskElement.querySelector(".tasklist-checkbox");

		// Visual effect functions for toggling task completion
		function indicateChecked() {
			checkbox.checked === true;
			taskElement.classList.add("checked"); 
			taskElement.classList.add("crossout");
		}
		function indicateUnchecked() {
			checkbox.checked === false;
			taskElement.classList.remove("checked"); 
			taskElement.classList.remove("crossout");
		}

		// Make an initial check depending on task data
		if(task.checked === true) {
			indicateChecked();
		}
		else if(task.checked === false){
			indicateUnchecked();
		}

		// Toggle both values And visual appearance upon clicking the checkbox
		checkbox.addEventListener("click", function(){
			task.checked = !(task.checked);
			if(task.checked === true) {
				indicateChecked();
			}
			else if(task.checked === false) {
				indicateUnchecked();
			}			
		});

		// Add Event listener for click to display task information
		taskElement.addEventListener("click", function(){
				// If you click the checkbox do not run commands
				if(event.target === checkbox){
					return;
				}
				Modal.renderTaskDescriptionModal(task);

				// field element variables
				let titleField = document.getElementById("task-details-title-field");
				let descriptionField = document.getElementById("task-details-description-field");
				let dateField = document.getElementById("task-details-date-field");
				let timeField = document.getElementById("task-details-time-field");
				let priorityField = document.getElementById("task-details-priority-menu");

				// old values are stored for future use
				let oldTitle = titleField.value;
				let oldDescription = descriptionField.value;				
				let oldDate = dateField.value;
				let oldTime = timeField.value;
				let oldPriority = priorityField.value;

				let editButton = document.getElementById("task-details-edit");
				let deleteButton = document.getElementById("task-details-delete");
				let applyButton = document.getElementById("task-details-apply");
				let cancelButton = document.getElementById("task-details-cancel");

				deleteButton.addEventListener("click", function(event){
					event.preventDefault();					
					Modal.renderDeleteTaskModal(task.title);

					let confirmDeleteButton = document.getElementById("delete-task-confirm");
					let cancelDeleteButton = document.getElementById("delete-task-cancel");

					confirmDeleteButton.addEventListener("click", function(event){
						event.preventDefault();

						let projectTitle = document.querySelector(".tasklist-group-header").textContent;
						taskElementContainer.removeChild(taskElement); 
						TaskData.deleteTask(projectTitle, task);
						Modal.deleteModal(document.getElementById("delete-task-backdrop"));
						Modal.deleteModal(document.getElementById("task-details-backdrop"));
					});

					cancelDeleteButton.addEventListener("click", function(event){
						event.preventDefault();
						
						Modal.deleteModal(document.getElementById("delete-task-backdrop"));
					});

				});
				// Listener for edit task button
				editButton.addEventListener("click", function(event){
					event.preventDefault();

					editButton.classList.add("hide");
					deleteButton.classList.add("hide");
					applyButton.classList.remove("hide");
					cancelButton.classList.remove("hide");

					// transform the disabled buttons into enabled ones
					let inputFields =  document.querySelectorAll(".task-details-modal-required");
					for (let input of inputFields){
						input.disabled = false;

					}
					// Clear both the date & time fields
					// document.getElementById("task-details-date-field").value = "Date (optional)";
					// document.getElementById("task-details-time-field").value = "Time (optional)";
					
					let inputDate = format(task.date, 'YYYY-MM-DD');
					document.getElementById("task-details-date-field").value = inputDate;
					// document.getElementById("task-details-date-field").value = "2020-01-15";
{
					// let placeholderDate = new Date(`${inputDate} ${task.time}`);
					// console.log(placeholderDate);
					// let inputTime = format(new Date(`${inputDate} ${task.time}`), 'hh:mmA');
					let inputTime = standardToMilitary(task.time);
					document.getElementById("task-details-time-field").value = inputTime;
}

					applyButton.addEventListener("click", function(event){
						event.preventDefault();
						 
						if(Modal.validEditTaskForm()) {
							// Submit if valid
							// let oldPriority = task.priority;
							taskElement.classList.remove("high");
							taskElement.classList.remove("medium");
							taskElement.classList.remove("low");

							// This is done to replace the values of the task object
							// that is located in the data structure
							let oldTask = task;
							let newTask = Modal.retrieveEditTaskData();
							TaskData.updateTaskProperties(oldTask, newTask);

							// Replacing the old text content of the Dom elements of the item
							let oldTitle = taskElement.querySelector(".tasklist-title");
							let oldDate = taskElement.querySelector(".tasklist-date");
							let oldTime = taskElement.querySelector(".tasklist-time");

							oldTitle.textContent = newTask.title;
							oldDate.textContent = newTask.date;
							oldTime.textContent = ` - ${newTask.time}`;							
							taskElement.classList.add(task.priority);

							let projectTitle = document.querySelector(".tasklist-group-header").textContent;
							
							Modal.deleteModal(document.getElementById("task-details-backdrop"));
						}
					});
					cancelButton.addEventListener("click", function(event){
						event.preventDefault();
						
						// do the opposite of the edit button (reverse its effects)
						editButton.classList.remove("hide");
						deleteButton.classList.remove("hide");
						applyButton.classList.add("hide");
						cancelButton.classList.add("hide");

						// transform the enabled buttons into disabled ones
						let inputFields =  document.querySelectorAll(".task-details-modal-required");
						for (let input of inputFields){
							input.disabled = true;
						}

						// Restore the original values before editing
						titleField.value = oldTitle;
						descriptionField.value = oldDescription;
						dateField.value = oldDate;
						timeField.value = oldTime;
						priorityField.value = oldPriority;
					});
					
				});

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
			taskElement.classList.add("tasklist-task");
			taskElement.classList.add(task.priority);
			taskElement.insertAdjacentHTML("beforeend", `
				<div class="checkbox-title-div">
					<input class="tasklist-checkbox" type="checkbox" name="finished">
					<span class="tasklist-title">${task.title}</span>
				</div>
				<span class="date-time-span">
					<span class="tasklist-date">${task.date} </span>
					<span class="time-hide-mobile tasklist-time"> - ${task.time}</span>
				</span>		
			`);	

			let checkbox = taskElement.querySelector(".tasklist-checkbox"); 

		// Visual effect functions for toggling task completion
		function indicateChecked() {
			checkbox.checked === true;
			taskElement.classList.add("checked"); 
			taskElement.classList.add("crossout");
		}
		function indicateUnchecked() {
			checkbox.checked === false;
			taskElement.classList.remove("checked"); 
			taskElement.classList.remove("crossout");
		}

		// Make an initial check depending on task data
		if(task.checked === true) {
			indicateChecked();

		}
		else if(task.checked === false){
			indicateUnchecked();
		}

		// Toggle both values And visual appearance upon clicking the checkbox
		checkbox.addEventListener("click", function(){
			task.checked = !(task.checked);
			if(task.checked === true) {
				indicateChecked();
			}
			else if(task.checked === false) {
				indicateUnchecked();
			}
				
		});
				

			taskElement.addEventListener("click", function(event){
				// If you click the checkbox do not run commands
				if(event.target === checkbox){
					return;
				}

				Modal.renderTaskDescriptionModal(task);

				// field element variables
				let titleField = document.getElementById("task-details-title-field");
				let descriptionField = document.getElementById("task-details-description-field");
				let dateField = document.getElementById("task-details-date-field");
				let timeField = document.getElementById("task-details-time-field");
				let priorityField = document.getElementById("task-details-priority-menu");

				// old values are stored for future use
				let oldTitle = titleField.value;
				let oldDescription = descriptionField.value;				
				let oldDate = dateField.value;
				let oldTime = timeField.value;
				let oldPriority = priorityField.value;

				// button element variables
				let editButton = document.getElementById("task-details-edit");
				let deleteButton = document.getElementById("task-details-delete");
				let applyButton = document.getElementById("task-details-apply");
				let cancelButton = document.getElementById("task-details-cancel");

				deleteButton.addEventListener("click", function(event){
					event.preventDefault();					
					Modal.renderDeleteTaskModal(task.title);

					let confirmDeleteButton = document.getElementById("delete-task-confirm");
					let cancelDeleteButton = document.getElementById("delete-task-cancel");

					confirmDeleteButton.addEventListener("click", function(event){
						event.preventDefault();

						let projectTitle = document.querySelector(".tasklist-group-header").textContent;

						TaskData.deleteTask(projectTitle, task);
						taskElementContainer.removeChild(taskElement); 
						Modal.deleteModal(document.getElementById("delete-task-backdrop"));
						Modal.deleteModal(document.getElementById("task-details-backdrop"));
					});

					cancelDeleteButton.addEventListener("click", function(event){
						event.preventDefault();

						Modal.deleteModal(document.getElementById("delete-task-backdrop"));
					});

				});
				// Listener for edit task button
				editButton.addEventListener("click", function(event){
					event.preventDefault();



					editButton.classList.add("hide");
					deleteButton.classList.add("hide");
					applyButton.classList.remove("hide");
					cancelButton.classList.remove("hide");

					// transform the disabled buttons into enabled ones
					let inputFields =  document.querySelectorAll(".task-details-modal-required");
					for (let input of inputFields){
						input.disabled = false;
					}

					let inputDate = format(task.date, 'YYYY-MM-DD');
					document.getElementById("task-details-date-field").value = inputDate;
					// document.getElementById("task-details-date-field").value = "2020-01-15";
					
					// let placeholderDate = new Date(`${inputDate} ${task.time}`);
					// console.log(placeholderDate);
					// let inputTime = format(new Date(`${inputDate} ${task.time}`), 'hh:mmA');
					let inputTime = standardToMilitary(task.time);
					document.getElementById("task-details-time-field").value = inputTime;

					applyButton.addEventListener("click", function(event){
						event.preventDefault();
						 
						if(Modal.validEditTaskForm()) {
							// Submit if valid
							// let oldPriority = task.priority;
							taskElement.classList.remove("high");
							taskElement.classList.remove("medium");
							taskElement.classList.remove("low");

							// This is done to replace the values of the task object
							// that is located in the data structure
							let oldTask = task;
							let newTask = Modal.retrieveEditTaskData();
							TaskData.updateTaskProperties(oldTask, newTask);

							// Replacing the old text content of the Dom elements of the item
							let oldTitle = taskElement.querySelector(".tasklist-title");
							let oldDate = taskElement.querySelector(".tasklist-date");
							let oldTime = taskElement.querySelector(".tasklist-time");

							oldTitle.textContent = newTask.title;
							oldDate.textContent = newTask.date;
							oldTime.textContent = ` - ${newTask.time}`;							
							taskElement.classList.add(task.priority);

							let projectTitle = document.querySelector(".tasklist-group-header").textContent;
							
							Modal.deleteModal(document.getElementById("task-details-backdrop"));
						}
					});

					cancelButton.addEventListener("click", function(event){
						event.preventDefault();
						
						// do the opposite of the edit button (reverse its effects)
						editButton.classList.remove("hide");
						deleteButton.classList.remove("hide");
						applyButton.classList.add("hide");
						cancelButton.classList.add("hide");

						// transform the enabled buttons into disabled ones
						let inputFields =  document.querySelectorAll(".task-details-modal-required");
						for (let input of inputFields){
							input.disabled = true;
						}

						// Restore the original values before editing
						titleField.value = oldTitle;
						descriptionField.value = oldDescription;
						dateField.value = oldDate;
						timeField.value = oldTime;
						priorityField.value = oldPriority;
					});
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
