let getTasksByStatus = (tasks, status)=>{
	let statusTasks = tasks.filter((task)=>task.status==status)
	return statusTasks
}

// a little function to help with reordering the result
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


	// Only for redux, dont send to backend
	if (action.type === 'TASKS_SET') {
		let reordered = action.tasks.sort(reorderByPriority)
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


	if (action.type === 'TASK_DELETE') {
		// Create new tasks without deleted
		let newTasks = state.tasks.filter((task)=>(task.id!=action.id))
		// Reorder
		let reordered = newTasks.sort(reorderByPriority)
		
		let newScrumDesk = {
			planning: getTasksByStatus(reordered, 'planning'),
			processing: getTasksByStatus(reordered, 'processing'),
			done: getTasksByStatus(reordered, 'done'),
		}
		// Updating
		return {
			...state,
			scrumDesk: newScrumDesk,
			tasks: newTasks,
		}
	}


	// Use this for send data to backend 
	if (action.type === 'TASK_CHANGE') {

		// Here needed to send changed task to backend
		// ...
		//
        
		// Redux reform
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


	// Use this for send data to backend 
	if (action.type === 'TASK_CREATE') {

		// Here needed to send new task to backend
		// ...
		//
					
		// Redux reform
		let newTasks = [...state.tasks, action.task]
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