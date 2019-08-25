import {format, endOfYesterday, isBefore} from 'date-fns';

import '!style-loader!css-loader!./modal.css';

class Modal {
    // General helpers here
    static deleteModal(modal){
        modal.classList.remove("show");
        modal.firstElementChild.classList.remove("show");
        setTimeout(function(){
            document.getElementById("content").removeChild(modal);
        }, 301); 
    }
    static emptyFieldError(field){
            let parent = field.parentElement;
            let errorMessage = parent.querySelector(".modal-error-message.empty-error");
            if(errorMessage) {
                parent.removeChild(errorMessage);
            }
            if(field.value) {
                return false;
            }
            
            parent.insertAdjacentHTML("beforeend", `
                <span class="modal-error-message empty-error">Please fill out this field.</span>
            `);
            return true;
    }
    // ***********************AddTaskModal here************** ****************************
	static renderAddTaskModal(){
		// let taskContainer = document.getElementById("tasklist-container");
		let modal = document.createElement("div");
		modal.id = "add-task-backdrop";
        modal.classList.add("backdrop");
        modal.classList.add("modal-backdrop");

        // Retrieve current date just to use it As a limiter
        // Today becomes the minimum date
        let today = format(new Date(), "YYYY-MM-DD");
        let yesterday = endOfYesterday();
		modal.insertAdjacentHTML("beforeend", `
			<section class="modal-container" id="add-task-content" tabindex="-1" role="dialog" aria-hidden="true">
                <button class="modal-close" id="add-task-modal-close">x</button>
                <h1 class="modal-header">Add a Task</h1>
                <form id="add-task-form">
                    <div>
                        <input id="add-task-title-field" class="add-task-modal-required text-field" type="text" name="task-title" placeholder="Task Title" maxlength="40" required="true">
                    </div>
                    <div>
                        <textarea id="add-task-description-field" class="add-task-modal-required text-field" name="task-description" placeholder="Task Description" maxlength="200" required="true"></textarea>
                    </div>
                    <div class="date-time-container">
                        <label id="date-label" class="form-label" for="add-task-date-field">Task Deadline:</label>
                        <input id="add-task-date-field" class="add-task-modal-required datetime-field text-field" type="text" placeholder="Date (optional)" name="task-date" onfocus="(this.type='date')" required="true" min="${today}">
                        <input id="add-task-time-field" class="add-task-modal-required datetime-field text-field" type="text" placeholder="Time (optional)" name="task-time" onfocus="(this.type='time')">
                    </div>
                    
                    <div class="select-container">
                        <label class="form-label" for="add-task-priority-menu">Task Priority:</label>
                        <select class="add-task-modal-required form-select" name="task-priority" id="add-task-priority-menu">
                            <option value="">--Priority Level--</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        
                        
                    </div>
                    <input type="submit" class="form-submit" id="add-task-submit" value="Add This Task">
                </form>
            
            </section>
			`);
		document.getElementById("content").appendChild(modal);

        // Assigning variable names to elements

        let backdrop = document.getElementById("add-task-backdrop");
        let sectionContainer = document.getElementById("add-task-content");
        let submit = document.getElementById("add-task-submit");
        let closeButton = document.getElementById("add-task-modal-close");

        // Effects
        // Try making universal function for this since it is recycled
        setTimeout(function(){
            backdrop.classList.add("show");
            sectionContainer.classList.add("show");
            sectionContainer.setAttribute("aria-hidden", "false");
            setTimeout(function(){
                sectionContainer.focus();
            }, 301);
        }, 0);
		

        // event listeners
        backdrop.addEventListener("click", function(event){
            if(!((event.target === sectionContainer) || (sectionContainer.contains(event.target)))) {
                Modal.deleteModal(backdrop);
            }
        });
        closeButton.addEventListener("click", function(event){
            if((event.target !== sectionContainer) || sectionContainer.contains(event.target)) {
                Modal.deleteModal(backdrop);
            }
        });
        console.log("modal is add-tasked to the Dom");
	}    
    static validAddTaskDate(dateField){
        let yesterday = endOfYesterday();
        let parent = dateField.parentElement;
        let errorMessage = parent.querySelector(".modal-error-message.datetime-passed-error");

        // delete any date error messages
        if(errorMessage) {
            parent.removeChild(errorMessage);            
        }

        if(dateField.value === "") {
            return true;
        }

        if(isBefore(yesterday, dateField.value)) {
            return true;
        }
        else{
            parent.insertAdjacentHTML("beforeend", `
               <span class="modal-error-message datetime-passed-error">This date/time has passed already.</span> 
            `);
            return false;    
        }
        
    }
    static validAddTaskTime(timeField){
        let dateField = document.getElementById("add-task-date-field");
        let today = new Date();
        let parent = timeField.parentElement;
        let errorMessage = parent.querySelector(".modal-error-message.datetime-passed-error");
        let inputDateTime;

        function generateDateTimeError() {
            if(errorMessage) {
                parent.removeChild(errorMessage);
            }
            parent.insertAdjacentHTML("beforeend", `
                <span class="modal-error-message datetime-passed-error">This date/time has passed already.</span>  
            `);
        }
        // Ignore or skip if time field is empty
        if(!(timeField.value)) {
            return true;
        }
        // start by checking if the date is valid
        if(dateField.value) {
            if(Modal.validAddTaskDate(dateField)) {
                inputDateTime = new Date(`${dateField.value}T${timeField.value}`);
                if(isBefore(today, inputDateTime)) {
                    return true;
                }
                else{
                    generateDateTimeError();
                    return false;
                }
            }
            else{
                generateDateTimeError();
                return false;
            }            

        }
        else{
            let currentDate = format(new Date(), 'YYYY-MM-DD');
            inputDateTime = new Date(`${currentDate}T${timeField.value}`);
            if(isBefore(today, inputDateTime)) {
                return true;
            }
            else{
                generateDateTimeError();
                return false;
            }
        }
        
        



    }
    static validAddTaskForm(){
        
        // Assigning variable names to field elements
        let titleField = document.getElementById("add-task-title-field");
        let descriptionField = document.getElementById("add-task-description-field");
        let dateField = document.getElementById("add-task-date-field");
        let timeField = document.getElementById("add-task-time-field");
        let priorityField = document.getElementById("add-task-priority-menu");

        // Place them all inside an array for easy iteration
        let inputFields = [titleField, descriptionField, dateField, timeField, priorityField];

        // If the field is empty, inserts an error message <span>, and returns true
        // Otherwise it returns false and does nothing
        let errors = 0;

        // Run all error checks for each required field
        for (let field of inputFields){
            // Check first if it is a date field, as it is not required to be filled up
			if(field === dateField) {
                //Check if it is a valid date 
				if(!(Modal.validAddTaskDate(field))) {
                    errors++;
                }
			}
            else if(field === timeField) {
                //Check if it is a valid time
                if(!(Modal.validAddTaskTime(field))) {
                    errors++;
                }
            }
            else if(Modal.emptyFieldError(field)) {
                console.log("emptyError");
                errors++;
            }
        }

        if(errors > 0) {
            return false;
        }
        return true;
    }
    static retrieveAddTaskData(){
        let task = {};
        task.projectTitle = document.querySelector(".tasklist-group-header").textContent;

        let today = format(new Date(), "MM/DD/YYYY");

        task.title = document.getElementById("add-task-title-field").value;
        task.description = document.getElementById("add-task-description-field").value;

        // Check if date is empty, If so give it a default value of
        if(document.getElementById("add-task-date-field").value) {
            task.date = format(document.getElementById("add-task-date-field").value, 'MM/DD/YYYY');
        }
        else{
            task.date = today;
        }
        // Check if time is empty, If so give it a default value of
        if(document.getElementById("add-task-time-field").value) {
            // Do something that lets me convert time into a date structure
            // concatenate The date value To the time value
            let datetime = new Date(`${document.getElementById("add-task-date-field").value}T${document.getElementById("add-task-time-field").value}`);
            task.time = format(datetime, 'hh:mmA');
        }
        else{
            task.time = "11:59PM";
        }
        task.priority = document.getElementById("add-task-priority-menu").value;

        return task;
    }
    // ***********************AddProjectModal here************** ****************************
    static renderAddProjectModal(){
        let modal = document.createElement("div");
        modal.id = "add-project-backdrop";
        modal.classList.add("backdrop");
        modal.classList.add("modal-backdrop");
        modal.insertAdjacentHTML("beforeend", `
            <section class="modal-container" id="add-project-content" tabindex="-1" role="dialog" aria-hidden="true">
                <button class="modal-close" id="add-project-modal-close">x</button>
                <h1 class="modal-header">Add a Project</h1>
                <form id="add-task-form">
                    <div id="add-project-field-div">
                        <input id="add-project-title-field" class="add-project-modal-required text-field" type="text" name="project-title" placeholder="Project Title" maxlength="30" required="true">
                    </div>
                    
                    <input type="submit" class="form-submit" id="add-project-submit" value="Add This Project">
                </form>
            
            </section>
        `);
        document.getElementById("content").appendChild(modal);

        let backdrop = document.getElementById("add-project-backdrop");
        let sectionContainer = document.getElementById("add-project-content");
        let submit = document.getElementById("add-project-submit");
        let closeButton = document.getElementById("add-project-modal-close");

        // Effects
        // Try making universal function for this since it is recycled
        setTimeout(function(){
            backdrop.classList.add("show");
            sectionContainer.classList.add("show");
            sectionContainer.setAttribute("aria-hidden", "false");
            setTimeout(function(){
                sectionContainer.focus();
            }, 301);
        }, 0);
        

        // event listeners
        backdrop.addEventListener("click", function(event){
            if(!((event.target === sectionContainer) || (sectionContainer.contains(event.target)))) {
                Modal.deleteModal(backdrop);
            }
        });
        closeButton.addEventListener("click", function(event){
            if((event.target !== sectionContainer) || sectionContainer.contains(event.target)) {
                Modal.deleteModal(backdrop);
            }
        });
    }
    static validAddProjectForm(){
        
        // Assigning variable names to field elements
        let titleField = document.getElementById("add-project-title-field");

        // If the field is empty, inserts an error message <span>, and returns true
        // Otherwise it returns false and does nothing
        let errors = 0;

            
        if(Modal.emptyFieldError(titleField)) {
                console.log("emptyError");
                errors++;
            }
        if(errors > 0) {
            return false;
        }
        return true;
    }
    // ***********************TaskDescriptionModal here************** ****************************
    static renderTaskDescriptionModal(task){

        let modal = document.createElement("div");
		modal.id = "task-details-backdrop";
		modal.classList.add("backdrop");
        modal.classList.add("modal-backdrop");

        // Retrieve current date just to use it As a limiter
        // Today becomes the minimum date
        let today = format(new Date(), "YYYY-MM-DD");
        let yesterday = endOfYesterday();
		modal.insertAdjacentHTML("beforeend", `
			<section class="modal-container" id="task-details-content" tabindex="-1" role="dialog" aria-hidden="true">
                <button class="modal-close" id="task-details-modal-close">x</button>
                
                <form id="task-details-form">
                    <div>
                    <label id="task-details-title-label" class="block-label form-label task-details-label" for="task-details-date-field">Task Title:</label>
                        <input id="task-details-title-field" class="task-details-modal-required text-field" type="text" name="task-title" value="${task.title}" maxlength="40" required="true" disabled>
                    </div>
                    <div>
                        <label id="task-details-description-label" class="block-label form-label task-details-label" for="task-details-date-field">Task Description:</label>
                        <textarea id="task-details-description-field" class="task-details-modal-required text-field" name="task-description" maxlength="200" required="true" disabled>${task.description}</textarea>
                    </div>
                    <div class="date-time-container">
                        <label id="task-details-date-label" class="form-label task-details-label" for="task-details-date-field">Task Deadline:</label>
                        <input id="task-details-date-field" class="task-details-modal-required datetime-field text-field" type="text" value="${task.date}" name="task-date" onfocus="(this.type='date')" required="true" min="${today}" disabled>
                        <input id="task-details-time-field" class="task-details-modal-required datetime-field text-field" type="text" value="${task.time}" name="task-time" onfocus="(this.type='time')" disabled>
                    </div>
                    
                    <div id="task-details-select-container" class="select-container">
                        <label id="task-details-priority-label" class="form-label task-details-label" for="task-details-priority-menu">Task Priority:</label>
                        <select class="task-details-modal-required form-select" name="task-priority" id="task-details-priority-menu" disabled>
                            <option value="">--Priority Level--</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        
                        
                    </div>
                    <div class="two-buttons-container">
                        <button class="task-details-button" id="task-details-delete">Delete Task</button>
                        <button class="task-details-button" id="task-details-edit">Edit Task</button>                        
                        <button class="task-details-button hide" id="task-details-cancel">Cancel</button>
                    </div>
                </form>
            
            </section>
            `);
            
        let priorityMenu = modal.querySelector("#task-details-priority-menu");
        if(task.priority === "high"){
            priorityMenu.value = "high";
            priorityMenu.classList.add("high");
        }
        else if (task.priority === "medium"){
            priorityMenu.value = "medium";
            priorityMenu.classList.add("medium");
        }
        else if (task.priority === "low"){
            priorityMenu.value = "low";
            priorityMenu.classList.add("low");
        }


		document.getElementById("content").appendChild(modal);

        // Assigning variable names to elements

        let backdrop = document.getElementById("task-details-backdrop");
        let sectionContainer = document.getElementById("task-details-content");
        let submit = document.getElementById("task-details-edit");
        let closeButton = document.getElementById("task-details-modal-close");

        // Effects
        // Try making universal function for this since it is recycled
        setTimeout(function(){
            backdrop.classList.add("show");
            sectionContainer.classList.add("show");
            sectionContainer.setAttribute("aria-hidden", "false");
            setTimeout(function(){
                sectionContainer.focus();
            }, 301);
        }, 0);
		

        // event listeners
        backdrop.addEventListener("click", function(event){
            if(!((event.target === sectionContainer) || (sectionContainer.contains(event.target)))) {
                Modal.deleteModal(backdrop);
            }
        });
        closeButton.addEventListener("click", function(event){
            if((event.target !== sectionContainer) || sectionContainer.contains(event.target)) {
                Modal.deleteModal(backdrop);
            }
        });
    }
}

export default Modal;