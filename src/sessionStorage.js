export const loadState = () =>{
	try {
		const serializedState = sessionStorage.getItem('task_tracker')
		if (serializedState === null){
			return undefined
		}
		return JSON.parse(serializedState)
	} catch (err) {
		console.log(err)
		return undefined
	}
}

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state)
		sessionStorage.setItem('task_tracker', serializedState)
	} catch (err){
		console.log(err)
	}
}

export const clearState = () => {
	try {
		sessionStorage.removeItem('task_tracker')
	} catch (err){
		console.log(err)
	}
}
