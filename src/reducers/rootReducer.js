let getTasksByStatus = (tasks, status)=>{
	let statusTasks = tasks.filter((task)=>task.status==status)
	return statusTasks
}

let reorderByPriority = (taskA, taskB) => {
	let numPriority = (text)=>{
		if (text == 'high') return 0
		if (text == 'medium') return 1
		if (text == 'low') return 2
		return 0
	}
	let aPriority = numPriority(taskA.priority)
	let bPriority = numPriority(taskB.priority)
	return aPriority-bPriority;
}


const initState = {
	user: '',
	passHash: '',
	isLoggedIn: false,
	alert: null,
	scrumDesk:{
		planning: [],
		processing: [],
		done: [],
	},
	tasks: [],
	representation: 'scrumDesk',
}



const rootReducer = (state = initState, action) => {

	if (action.type === 'AUTH') {
		return {
			...state,
			isLoggedIn: action.authData.isLoggedIn,
			user: action.authData.login,
			passHash: action.authData.passHash,
		}
	}


	if (action.type === 'SET_ALERT') {
		return {
			...state,
			alert: action.alert,
		}
	}


	if (action.type === 'REPRESENTATION_CHANGE') {
		return {
			...state,
			representation: action.representation,
		}
	}


	if (action.type === 'TASKS_SET') {
		// Auto reorder
		let reordered = action.tasks.sort(reorderByPriority)
		// Refresh desk
		let newScrumDesk = {
			planning: getTasksByStatus(reordered, 'planning'),
			processing: getTasksByStatus(reordered, 'processing'),
			done: getTasksByStatus(reordered, 'done'),
		}     
		return {
			...state,
			scrumDesk: newScrumDesk,
			tasks: action.tasks,
		}
	}


	if (action.type === 'TASK_CHANGE') {
		let newTasks = state.tasks.map((task)=>{
			if (task.id==action.task.id){
				task=action.task
			}
			return task
		})
		let reordered = newTasks.sort(reorderByPriority)
		let newScrumDesk = {
			planning: getTasksByStatus(reordered, 'planning'),
			processing: getTasksByStatus(reordered, 'processing'),
			done: getTasksByStatus(reordered, 'done'),
		}
		return {
			...state,
			scrumDesk: newScrumDesk,
			tasks: newTasks,
		}
	}


	return {
		...state,
	}
}

export default rootReducer