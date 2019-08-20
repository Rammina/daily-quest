class TaskData {
	projects = [];
	projectId = 0;

	addProject(projectTitle, projectTasks){
		// Check for any duplicates and titles before pushing
		for (let project of projects){
			if(projectTitle === project.title) {
				// Abort adding this project and show an error
				console.log("duplicate project title");
				// Cancel the function or method
				return;
			}
		}
		let project = {
			// string value
			title: projectTitle, 
			// array containing tasks(which are objects)
			tasks: projectTasks,
			// Unique ID used to retrieve this project later on
			uniqueId: projectId
		}
		projectId++;
		projects.push(project);

		return true;
	}
	addTask(projectTitle, task){
		// Search the projects array and find a match
		for (let project of projects){
			// If a match is found proceeded to pushing the task inside the project
			if(project.title === projectTitle) {
				project.push(task);
				return true;
			}
		}
		return false;
	}
}

export default TaskData;