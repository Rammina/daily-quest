import '!style-loader!css-loader!./tasklist.css';

import Modal from './modal.js';

class Tasklist {
	render(){
		let tasklistSection = document.createElement("section");
		// tasklistSection.style.background = `url(${PizzatasklistBg})`;
		// tasklistSection.style.backgroundSize = 'cover';
		// tasklistSection.style.backgroundRepeat = 'no-repeat';
		// tasklistSection.style.backgroundPosition = '50% 0%';
		// tasklistSection.classList.add("slider-section");
		tasklistSection.id = "tasklist-container";
		tasklistSection.insertAdjacentHTML("beforeend", `
				<div id="tasklist-content">
                	<div id="tasklist-text">
                    	<h1 id="tasklist-header">:3</h1>
                    	<p id="tasklist-paragraph">Check your Projects for tasks you have to finish. The Due Today section contains urgent tasks. Do your best!</p>
	                    <button id="tasklist-button">View Menu</button>
                	</div>
	            </div>
<div class="tasklist-group-container">
	<div class="tasklist-group-content">
		<h2 class="tasklist-group-header">Default</h2>
		<button class="tasklist-add-button">+</button>
		<ul class="tasklist-tasks">
			<li class="tasklist-task">
				<span><input class="tasklist-checkbox" type="checkbox" name="finished"></span>
				<span>eat dinner</span>
				<span>08/09/19</span>
			</li>
		</ul>
	</div>
</div>
		`);
		tasklistSection.style.display = "block";
		document.querySelector("main").appendChild(tasklistSection);

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
		// Add padding necessary if so
		if(tasklistSection.classList.contains("show-menu")){		
			content.classList.add("show-menu");
		}

		let tasksElement = "";

		// Generate a list item for every task
		for (let task of projectTasks){
			tasksElement += `
			<li class="tasklist-task">
				<span><input class="tasklist-checkbox" type="checkbox" name="finished" checked="${task.checked}"></span>
				<span>${task.title}</span>
				<span>${task.deadline}</span>
			</li>
			`;
		}
		content.insertAdjacentHTML("beforeend", `			
	<div class="tasklist-group-content">
		<h2 class="tasklist-group-header">${projectTitle}</h2>
		<button class="tasklist-add-button">+</button>
		<ul class="tasklist-tasks">
			${tasksElement}
		</ul>
	</div>
			`);
		function openAddModal() {
			Modal.renderAddModal();
		}

		content.querySelector(".tasklist-add-button").addEventListener("click", function(){
			openAddModal();
		});
		tasklistSection.appendChild(content);
	}
	remove(){
		let tasklistSection = document.getElementById("tasklist-container");
		tasklistSection.parentElement.removeChild(tasklistSection);
		// tasklistSection.style.display = "none";
		console.log("tasklist remove Activated");
	}
}

export default Tasklist;
