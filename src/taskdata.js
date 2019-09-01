let projects = [];
let projectId = 0;
let taskId = 0;

class TaskData {
	static printProjects() {
		console.log(projects);
	}

	static addTask(projectTitle, task) {
		// Search the projects array and find a match
		console.log(projects);
		for (let project of projects) {
			// If a match is found proceed to pushing the task inside the project
			if (project.title === projectTitle) {
				task.uniqueId = taskId;
				taskId++;
				project.tasks.push(task);
				console.log(projects);
				return task;
			}
		}
		return false;
	}
	static updateTaskProperties(oldTask, newTask) {
		for (var prop in oldTask) {
			// skip loop if the property is from prototype
			if (!oldTask.hasOwnProperty(prop)) {
				continue;
			}
			// do not change the unique ID
			if (prop === "uniqueId") {
				console.log("uniqueId remains as is");
				continue;
			}

			console.log(prop);
			// your code
			console.log(`${oldTask[prop]} is now `);
			oldTask[prop] = newTask[prop];
			console.log(`${oldTask[prop]}`);
		}
		console.log(oldTask);
		return true;
	}

	static addProject(projectTitle, projectTasks) {
		console.log(projects);
		// Check for any duplicates and titles before pushing
		for (let project of projects) {
			if (projectTitle === project.title) {
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
		};
		for (let task of projectTasks) {
			task.uniqueId = taskId;
			project.tasks.push(task);

			taskId++;
		}
		projectId++;
		projects.push(project);
		console.log(projects);

		return project;
	}

	static deleteTask(projectTitle, task) {
		console.log(projects);
		console.log(projects[projects.findIndex(project => project.title === projectTitle)]);
		console.log(projects.findIndex(project => project.title === projectTitle));
		let taskContainer =
			projects[projects.findIndex(project => project.title === projectTitle)].tasks;
		console.log(taskContainer);
		console.log(taskContainer.findIndex(storedTask => storedTask.uniqueId === task.uniqueId));
		taskContainer.splice(
			taskContainer.findIndex(storedTask => storedTask.uniqueId === task.uniqueId),
			1
		);
		console.log(projects);
	}
}

export default TaskData;
