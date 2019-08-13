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
                        <input id="add-description-field" class="text-field" type="text" name="description" placeholder="Task Description" required="true">
                    </div>
                    <div>
                        <input id="add-date-field" class="text-field" type="number" name="pages" placeholder="Pages">
                    </div>
                    
                    <div class="checkbox-container">
                        <input class="form-checkbox" type="checkbox" name="read-checkbox" id="read-checkbox">
                        <label class="form-label" for="read-checkbox">Read</label>
                        
                    </div>
                    <input type="submit" class="form-submit" id="add-submit" value="Add This add">
                </form>
            
            </section>
			`);
		document.getElementById("content").appendChild(modal);

		// Effects
		document.getElementById("add-backdrop").classList.add("show");
		document.getElementById("add-content").classList.add("show");
		console.log("modal is added to the Dom");
	}

}

export default Modal;