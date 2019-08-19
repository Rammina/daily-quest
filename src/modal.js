import {format, endOfYesterday, isBefore} from 'date-fns';

import '!style-loader!css-loader!./modal.css';

class Modal {
    static deleteModal(modal){
        document.getElementById("content").removeChild(modal);
    }
	static renderAddModal(){
		// let taskContainer = document.getElementById("tasklist-container");
		let modal = document.createElement("div");
		modal.id = "add-backdrop";
		modal.classList.add("backdrop");

        // Retrieve current date just to use it As a limiter
        // Today becomes the minimum date
        let today = format(new Date(), "YYYY-MM-DD");
        let yesterday = endOfYesterday();
		modal.insertAdjacentHTML("beforeend", `
			<section class="modal-container" id="add-content" tabindex="-1" role="dialog" aria-hidden="true">
                <button id="add-modal-close">x</button>
                <h1 class="modal-header">Add a Task</h1>
                <form id="add-form">
                    <div>
                        <input id="add-title-field" class="add-modal-required text-field" type="text" name="title" placeholder="Task Title" maxlength="40" required="true">
                    </div>
                    <div>
                        <textarea id="add-description-field" class="add-modal-required text-field" name="description" placeholder="Task Description" maxlength="200" required="true"></textarea>
                    </div>
                    <div class="date-time-container">
                        <label id="date-label" class="form-label" for="add-date-field">Task Deadline:</label>
                        <input id="add-date-field" class="add-modal-required datetime-field text-field" type="text" placeholder="Date" name="date" onfocus="(this.type='date')" required="true" min="${today}">
                        <input id="add-time-field" class="datetime-field text-field" type="text" placeholder="Time (optional)" name="time" onfocus="(this.type='time')">
                    </div>
                    
                    <div class="select-container">
                        <label class="form-label" for="add-priority-menu">Task Priority:</label>
                        <select class="add-modal-required form-select" name="priority" id="add-priority-menu">
                            <option value="">--Priority Level--</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        
                        
                    </div>
                    <input type="submit" class="form-submit" id="add-submit" value="Add This Task">
                </form>
            
            </section>
			`);
		document.getElementById("content").appendChild(modal);

        // Assigning variable names to elements

        let backdrop = document.getElementById("add-backdrop");
        let sectionContainer = document.getElementById("add-content");
        let submit = document.getElementById("add-submit");
        let closeButton = document.getElementById("add-modal-close");

		// Effects
		backdrop.classList.add("show");
        sectionContainer.classList.add("show");
        sectionContainer.focus();

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
        console.log("modal is added to the Dom");
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
    static validAddDate(dateField){
        let yesterday = endOfYesterday();
        let parent = dateField.parentElement;
        let errorMessage = parent.querySelector(".modal-error-message.before-yesterday-error");

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
               <span class="modal-error-message before-yesterday-error">This date has passed already.</span> 
            `);
            return false;    
        }
        
    }
    static validAddForm(){
        
        // Assigning variable names to field elements
        let titleField = document.getElementById("add-title-field");
        let descriptionField = document.getElementById("add-description-field");
        let dateField = document.getElementById("add-date-field");
        let priorityField = document.getElementById("add-priority-menu");

        // Place them all inside an array for easy iteration
        let requiredFields = [titleField, descriptionField, dateField, priorityField];
        // If the field is empty, inserts an error message <span>, and returns true
        // Otherwise it returns false and does nothing
        let errors = 0;

        // Run all error checks for each required field
        for (let field of requiredFields){
            // Restrict the date field to only accept dates from today onwards
			if(field === dateField) {
				if(Modal.validAddDate(field)) {
                    
                }
                else {
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
    static retrieveTaskData(){
        let task = {};

        let today = format(new Date(), "MM/DD/YYYY");

        task.title = document.getElementById("add-title-field").value;
        task.description = document.getElementById("add-description-field").value;

        // Check if date is empty, If so give it a default value of
        if(document.getElementById("add-date-field").value) {
            task.date = format(document.getElementById("add-date-field").value, 'MM/DD/YYYY');
        }
        else{
            task.date = today;
        }
        // Check if time is empty, If so give it a default value of
        if(document.getElementById("add-time-field").value) {
            // Do something that lets me convert time into a date structure
            // concatenate The date value To the time value
            let datetime = new Date(`${document.getElementById("add-date-field").value}T${document.getElementById("add-time-field").value}`);
            task.time = format(datetime, 'HH:mmA');
        }
        else{
            task.time = "11:59PM";
        }
        task.priority = document.getElementById("add-priority-menu").value;

        return task;
    }

}

export default Modal;