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
		modal.insertAdjacentHTML("beforeend", `
			<section class="modal-container" id="add-content" tabindex="-1" role="dialog" aria-hidden="true">
                <button id="add-modal-close">x</button>
                <h1 class="modal-header">Add a Task</h1>
                <form id="add-form">
                    <div>
                        <input id="add-title-field" class="text-field" type="text" name="title" placeholder="Task Title" required="true">
                    </div>
                    <div>
                        <textarea id="add-description-field" class="text-field" name="description" placeholder="Task Description" required="true"></textarea>
                    </div>
                    <div>
                        <input id="add-deadline-field" class="text-field" type="text" name="date" placeholder="Task Deadline" onfocus="(this.type='datetime-local')" onblur="if(this.value===''){(this.type='text')}">
                    </div>
                    
                    <div class="select-container">
                        <label class="form-label" for="add-priority-menu">Task Priority:</label>
                        <select class="form-select" name="priority" id="add-priority-menu">
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
    static retrieveTaskData(){
        let task = {};
        task.title = document.getElementById("add-title-field").value;
        task.description = document.getElementById("add-description-field").value;
        task.deadline = document.getElementById("add-deadline-field").value;
        task.priority = document.getElementById("add-priority-menu").value;

        return task;
    }

}

export default Modal;