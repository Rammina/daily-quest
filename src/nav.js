import "!style-loader!css-loader!./nav.css";

import TaskData from "./taskdata.js";
import Tasklist from "./tasklist.js";
import Modal from "./modal.js";

import HamburgerIcon from "./images/hamburger-icon.png";
import DeleteImg from "./images/delete.png";

class Navigation {
	render() {
		let navbar = document.createElement("header");
		navbar.classList.add("main-header");
		navbar.insertAdjacentHTML(
			"beforeend",
			`
			<nav class="main-nav">
            <!--  The anchor tag needs to link to the page top-->
            <button id="nav-menu" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navbarResponsive"><img id="nav-menu-img" src="${HamburgerIcon}" alt="Hamburger Icon"></button>
            <a href="#" id="nav-title">Daily Quest</a>

            
            <div class="backdrop" id="nav-backdrop"></div>
            <ul class="nav-items" id="navbarResponsive">
            	<li class="nav-item-container"><button id="projects-button" class="nav-item" aria-expanded="false" href="#">Projects <button id="add-project-button">+</button></button>
            		<ul class="projects-items">
						
            		</ul>
            	</li>
                <li class="nav-item-container"><button class="nav-item" aria-expanded="false">Due Today</button></li>
                <li class="nav-item-container"><button class="nav-item" aria-expanded="false">Finished Tasks</button></li>
                
            </ul>
            
            </nav>
		`
		);

		let mainContent = document.querySelector("main");
		document.body.insertBefore(navbar, mainContent);
		// Dom elements of the navigation bar
		let title = document.getElementById("nav-title");
		let menubutton = document.getElementById("nav-menu");
		let navBackdrop = document.getElementById("nav-backdrop");
		let menuitems = document.querySelector(".nav-items");
		let menuitem = document.querySelector(".nav-item");
		let projectbutton = document.getElementById("projects-button");
		let addProjectButton = document.getElementById("add-project-button");
		let projectitems = document.querySelector(".projects-items");

		let tasklistContainer = document.getElementById("tasklist-container");

		function showMenu() {
			menuitems.classList.add("show");
			menubutton.setAttribute("aria-expanded", "true");
			navBackdrop.classList.add("show");
			tasklistContainer.classList.add("show-menu");
			if (document.querySelector(".tasklist-group-container")) {
				document.querySelector(".tasklist-group-container").classList.add("show-menu");
			}
		}

		function hideMenu() {
			menuitems.classList.remove("show");
			menubutton.setAttribute("aria-expanded", "false");
			navBackdrop.classList.remove("show");
			tasklistContainer.classList.remove("show-menu");
			if (document.querySelector(".tasklist-group-container")) {
				document.querySelector(".tasklist-group-container").classList.remove("show-menu");
			}
		}

		function showProject() {
			projectitems.classList.add("show");
			projectbutton.setAttribute("aria-expanded", "true");
			let projectItems = document.querySelectorAll(".projects-item");
			let projectDelete = document.querySelectorAll(".projects-item-delete");
			for (let i = 0; i < projectItems.length; i++) {
				projectItems[i].classList.add("show");
			}
		}

		function hideProject() {
			projectitems.classList.remove("show");
			projectbutton.setAttribute("aria-expanded", "false");
			let projectItems = document.querySelectorAll(".projects-item");
			let projectDelete = document.querySelectorAll(".projects-item-delete");
			for (let i = 0; i < projectItems.length; i++) {
				projectItems[i].classList.remove("show");
			}
		}

		title.addEventListener("click", function() {
			Tasklist.hideTasklist();
		});

		menubutton.addEventListener("click", function() {
			if (menubutton.getAttribute("aria-expanded") === "false") {
				showMenu();

				console.log("menu has been shown");
			} else {
				hideMenu();
				console.log("menu has been hidden");
			}
		});

		navBackdrop.addEventListener("click", function() {
			hideMenu();
			console.log("menu has been hidden");
		});

		projectbutton.addEventListener("click", function() {
			if (projectbutton.getAttribute("aria-expanded") === "false") {
				showProject();
			} else {
				hideProject();
			}
		});

		addProjectButton.addEventListener("click", function() {
			Modal.renderAddProjectModal();

			document
				.getElementById("add-project-title-field")
				.addEventListener("blur", function(event) {
					if (Modal.emptyFieldError(document.getElementById("add-project-title-field"))) {
						return;
					}
				});

			document
				.getElementById("add-project-submit")
				.addEventListener("click", function(event) {
					event.preventDefault();

					if (Modal.validAddProjectForm()) {
						let projectTitle = document.getElementById("add-project-title-field").value;
						let projectTasks = [];
						let newProject = TaskData.addProject(projectTitle, projectTasks);

						if (newProject) {
							Navigation.renderProject(newProject);
							Modal.deleteModal(document.getElementById("add-project-backdrop"));
							showProject();
						}
					}
				});
		});
	}
	static renderProject(project) {
		let projectElement = document.createElement("li");
		projectElement.classList.add("projects-item-container");

		projectElement.insertAdjacentHTML(
			"beforeend",
			`
				<button class="projects-item">${project.title}</button>
				<div class="projects-item-button-container">
					<button class="projects-item-button projects-item-settings">
						<img class="delete-projects-icon trash-image" src="${DeleteImg}" alt="Trashcan">
						<ul class="projects-item-settings-container">
							<li class="projects-item-setting">Rename</li>
							<li class="projects-item-setting">Delete</li>
						</ul>
					</button>
					<button class="projects-item-button projects-item-delete"><img class="delete-projects-icon trash-image" src="${DeleteImg}" alt="Trashcan"></button>
				</div>
			`
		);

		//Variable declarations for elements
		let settingsButton = projectElement.querySelector(".projects-item-settings");
		let deleteButton = projectElement.querySelector(".projects-item-delete");
		let openProjectButton = projectElement.querySelector(".projects-item");

		// Render the task upon clicking the project name
		openProjectButton.addEventListener("click", function() {
			Tasklist.renderTasks(project.title, project.tasks);
		});

		
		projectElement.addEventListener("mouseleave", function() {
			deleteButton.classList.remove("show");
			settingsButton.classList.remove("show");
		});
		// show the trashcan icon when hovering over the project item
		projectElement.addEventListener("mouseenter", function() {
			deleteButton.classList.add("show");
			settingsButton.classList.add("show");
		});

		openProjectButton.addEventListener("focus", function() {

			deleteButton.classList.add("show");
			settingsButton.classList.add("show");
		});

		openProjectButton.addEventListener("blur", function() {
			
			deleteButton.classList.remove("show");
			settingsButton.classList.remove("show");
		});

		deleteButton.addEventListener("focus", function() {

			deleteButton.classList.add("show");
			settingsButton.classList.add("show");
		});

		deleteButton.addEventListener("blur", function() {
			
			deleteButton.classList.remove("show");
			settingsButton.classList.remove("show");
		});

		settingsButton.addEventListener("focus", function() {

			deleteButton.classList.add("show");
			settingsButton.classList.add("show");
		});

		settingsButton.addEventListener("blur", function() {
			
			deleteButton.classList.remove("show");
			settingsButton.classList.remove("show");
		});


		// open the delete project prompt upon clicking the trashbin button
		deleteButton.addEventListener("click", function() {
			Modal.renderDeleteProjectModal(project);
			deleteButton.classList.add("modal-active");

			document
				.getElementById("delete-project-backdrop")
				.addEventListener("click", function(event) {
					if (
						!(
							event.target === document.getElementById("delete-project-content") ||
							document.getElementById("delete-project-content").contains(event.target)
						)
					) {
						deleteButton.classList.remove("modal-active");
					}
				});

			document
				.getElementById("delete-project-modal-close")
				.addEventListener("click", function(event) {
					deleteButton.classList.remove("modal-active");
				});

			// close the modal if cancel button was clicked
			document
				.getElementById("delete-project-cancel")
				.addEventListener("click", function(event) {
					event.preventDefault();
					Modal.deleteModal(document.getElementById("delete-project-backdrop"));
					deleteButton.classList.remove("modal-active");
				});

			// delete the project item if confirm was clicked
			document
				.getElementById("delete-project-confirm")
				.addEventListener("click", function(event) {
					event.preventDefault();

					document.querySelector(".projects-items").removeChild(projectElement);
					TaskData.deleteProject(project);
					Modal.deleteModal(document.getElementById("delete-project-backdrop"));
					deleteButton.classList.remove("modal-active");
				});
		});
		if (document.getElementById("projects-button").getAttribute("aria-expanded") === "true") {
			projectElement.querySelector(".projects-item").classList.add("show");
		}

		// Added to the document Dom
		document.querySelector(".projects-items").appendChild(projectElement);
		return true;
	}
	static showMenu() {
		document.querySelector(".nav-items").classList.add("show");
		document.getElementById("nav-menu").setAttribute("aria-expanded", "true");
		document.getElementById("nav-backdrop").classList.add("show");
		document.getElementById("tasklist-container").classList.add("show-menu");
		if (document.querySelector(".tasklist-group-container")) {
			document.querySelector(".tasklist-group-container").classList.add("show-menu");
		}
	}
	static showProject() {
		document.querySelector(".projects-items").classList.add("show");
		document.getElementById("projects-button").setAttribute("aria-expanded", "true");

		let projectItems = document.querySelectorAll(".projects-item");
		console.log(projectItems);
		for (let i = 0; i < projectItems.length; i++) {
			projectItems[i].classList.add("show");
			console.log("projectShow 171");
		}
	}
}

export default Navigation;
