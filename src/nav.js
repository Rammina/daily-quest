import '!style-loader!css-loader!./nav.css';

import Tasklist from './tasklist.js';

class Navigation {
	render(){
		let navbar = document.createElement("header");
		navbar.classList.add("main-header");
		navbar.insertAdjacentHTML("beforeend", `
			<nav class="main-nav">
            <!--  The anchor tag needs to link to the page top-->
            <button id="nav-menu" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navbarResponsive"></button>
            <a href="#" id="nav-title">Daily Quest</a>

            
            <div class="backdrop" id="nav-backdrop"></div>
            <ul class="nav-items" id="navbarResponsive">
            	<li><button id="projects-button" class="nav-item" aria-expanded="false" href="#">Projects</button>
            		<ul class="projects-items">
            			<li><button class="projects-item">Default</button></li>
            			<li><button class="projects-item">WebDev</button></li>
            			<li><button class="projects-item">Hobbies</button></li>
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
		}

		function hideProject() {
			projectitems.classList.remove("show");
			projectbutton.setAttribute("aria-expanded", "false");
		}

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


	}
	renderProject(projectTitle, projectTasks){
		let projectElement = document.createElement("li");
		projectElement.insertAdjacentHTML("beforeend", `
			<button class="projects-item">${projectTitle}</button>
			`);
		projectElement.querySelector(".projects-item").addEventListener("click", function(){
			Tasklist.renderTasks(projectTitle, projectTasks);
		});
		document.querySelector(".projects-items").appendChild(projectElement);

	}	
	
}

export default Navigation;