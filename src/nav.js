import '!style-loader!css-loader!./nav.css';

import TaskData from './taskdata.js';
import Tasklist from './tasklist.js';
import Modal from './modal.js';

import HamburgerIcon from './images/hamburger-icon.png';


class Navigation {
	render(){
		let navbar = document.createElement("header");
		navbar.classList.add("main-header");
		navbar.insertAdjacentHTML("beforeend", `
			<nav class="main-nav">
            <!--  The anchor tag needs to link to the page top-->
            <button id="nav-menu" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navbarResponsive"><img id="nav-menu-img" src="${HamburgerIcon}" alt="Hamburger Icon"></button>
            <a href="#" id="nav-title">Daily Quest</a>

            
            <div class="backdrop" id="nav-backdrop"></div>
            <ul class="nav-items" id="navbarResponsive">
            	<li><button id="projects-button" class="nav-item" aria-expanded="false" href="#">Projects <button id="add-project-button">+</button></button>
            		<ul class="projects-items">
						
            		</ul>
            	</li>
                <li><button class="nav-item" aria-expanded="false">Due Today</button></li>
                <li><button class="nav-item" aria-expanded="false">Finished Tasks</button></li>
                
            </ul>
            
            </nav>
		`);
		
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
			if(document.querySelector(".tasklist-group-container")) {
				document.querySelector(".tasklist-group-container").classList.add("show-menu");
			}
		}
		
		function hideMenu() { 
			menuitems.classList.remove("show");
			menubutton.setAttribute("aria-expanded", "false");
			navBackdrop.classList.remove("show");
			tasklistContainer.classList.remove("show-menu");
			if(document.querySelector(".tasklist-group-container")) {
				document.querySelector(".tasklist-group-container").classList.remove("show-menu");
			}
		}

		function showProject() {
			projectitems.classList.add("show");
			projectbutton.setAttribute("aria-expanded", "true");
			let projectItems = document.querySelectorAll(".projects-item");
			for(let i = 0; i < projectItems.length; i++) {
				projectItems[i].classList.add("show");
			}
		}

		function hideProject() {
			projectitems.classList.remove("show");
			projectbutton.setAttribute("aria-expanded", "false");
			let projectItems = document.querySelectorAll(".projects-item");
			for(let i = 0; i < projectItems.length; i++) {
				projectItems[i].classList.remove("show");
			}
		}

		title.addEventListener("click", function(){
			Tasklist.hideTasklist();
		});

		menubutton.addEventListener("click", function(){
			if((menubutton.getAttribute("aria-expanded")) === "false") {
				showMenu();

				console.log("menu has been shown");
			}
			else{
				hideMenu();
				console.log("menu has been hidden");
			}
		});		

		navBackdrop.addEventListener("click", function(){
				hideMenu();
				console.log("menu has been hidden");
			
		});

		projectbutton.addEventListener("click", function(){
			if((projectbutton.getAttribute("aria-expanded")) === "false") {
				showProject();
			}
			else{
				hideProject();
			}
		});

		addProjectButton.addEventListener("click", function(){
			Modal.renderAddProjectModal();

			document.getElementById("add-project-title-field").addEventListener("blur", function(event){
				if(Modal.emptyFieldError(document.getElementById("add-project-title-field"))) {
					return;
				}
			});

			document.getElementById("add-project-submit").addEventListener("click", function(event){
				event.preventDefault();

				if(Modal.validAddProjectForm()) {
					let projectTitle = document.getElementById("add-project-title-field").value;
					let projectTasks = [];
					let newProject = TaskData.addProject(projectTitle, projectTasks);
					
					if(newProject) {
						Navigation.renderProject(newProject.title, newProject.tasks);
						Modal.deleteModal(document.getElementById("add-project-backdrop"));
						showProject();
					}
					
					

				}
			});
		});

	}
	static renderProject(projectTitle, projectTasks){
			let projectElement = document.createElement("li");
			projectElement.insertAdjacentHTML("beforeend", `
				<button class="projects-item">${projectTitle}</button>
			`);

			projectElement.querySelector(".projects-item").addEventListener("click", function(){
				Tasklist.renderTasks(projectTitle, projectTasks);
			});
			if(document.getElementById("projects-button").getAttribute("aria-expanded") === "true"){
				projectElement.querySelector(".projects-item").classList.add("show");
			}
			
			// Added to the document Dom
			document.querySelector(".projects-items").appendChild(projectElement);
			return true;
		
	}	
	static showMenu(){
		document.querySelector(".nav-items").classList.add("show");
		document.getElementById("nav-menu").setAttribute("aria-expanded", "true");
		document.getElementById("nav-backdrop").classList.add("show");
		document.getElementById("tasklist-container").classList.add("show-menu");
		if(document.querySelector(".tasklist-group-container")) {
			document.querySelector(".tasklist-group-container").classList.add("show-menu");			

		}
	}
	static showProject(){
		document.querySelector(".projects-items").classList.add("show");
		document.getElementById("projects-button").setAttribute("aria-expanded", "true");
		
		let projectItems = document.querySelectorAll(".projects-item");
		console.log(projectItems);
		for(let i = 0; i < projectItems.length; i++) {
			projectItems[i].classList.add("show");
			console.log("projectShow 171");
		}
	}
	
}

export default Navigation;