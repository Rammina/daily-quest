import '!style-loader!css-loader!./modal.css';

class Modal {
	static renderAddModal(){
		// let taskContainer = document.getElementById("tasklist-container");
		let modal = document.createElement("div");
		modal.id = "add-backdrop";
		modal.classList.add("backdrop");
		modal.insertAdjacentHTML("beforeend", `
			<section class="modal-container" id="add-content" tabindex="-1" role="dialog" aria-hidden="true">
                <h1 class="modal-header">Add a Task</h1>
                <form id="add-form">
                    <div>
                        <input id="add-title-field" class="text-field" type="text" name="title" placeholder="Task Title" required="true">
                    </div>
                    <div>
                        <textarea id="add-description-field" class="text-field" name="description" placeholder="Task Description" required="true"></textarea>
                    </div>
                    <div>
                        <input id="add-date-field" class="text-field" type="text" name="date" placeholder="Task Deadline" onfocus="(this.type='datetime-local')" onblur="if(this.value===''){(this.type='text')}">
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
        modal.querySelector("#add-submit").addEventListener("click", function(event){
            event.preventDefault();
                // Find a way to get rid of mutual dependence between modules
        });
		document.getElementById("content").appendChild(modal);

		// Effects
		document.getElementById("add-backdrop").classList.add("show");
		document.getElementById("add-content").classList.add("show");
		console.log("modal is added to the Dom");
	}

}

export default Modal;