let projects = [];
let projectId = 0;
let taskId = 0;

class TaskData {
	
	static printProjects(){
		console.log(projects);
	}

	static addTask(projectTitle, task){
		// Search the projects array and find a match
		for (let project of projects){
			// If a match is found proceed to pushing the task inside the project
			if(project.title === projectTitle) {
				project.tasks.push(task);
				return true;
			}
		}
		return false;
	}

	static addProject(projectTitle, projectTasks){
		console.log(projects);
		// Check for any duplicates and titles before pushing
		for (let project of projects){
			if(projectTitle === project.title) {
				// Abort adding this project and show an error
				console.log("duplicate project title");
				// Cancel the function or method
				return false;
			}
		}
		let project = {
			// string value
			title: projectTitle, 
			// array containing tasks(which are objects)
			tasks: [],
			// Unique ID used to retrieve this project later on
			uniqueId: projectId
		}
		for (let task of projectTasks){
			task.uniqueId = taskId;
			project.tasks.push(task);

			taskId++;
		}
		projectId++;
		projects.push(project);

		return true;
	}
	
	
}

export default TaskData;