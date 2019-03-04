
const initState = {
    isLoggedIn: false,
    alert: null,
    tasks: []
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'AUTH') {
        return {
            ...state,
            isLoggedIn: action.isLoggedIn
        }
    }

    if (action.type === 'TASKS_SET') {
      
        return {
            ...state,
            tasks: action.tasks
        }
    }

    if (action.type === 'TASK_CHANGE') {
        let newTasks = ()=>{
            state.tasks.map((task)=>{
                if (task.id==action.task.id){
                    task=action.task
                }
                return task
            })
            return state.tasks
        }
        
        return {
            ...state,
            tasks: newTasks()
        }
    }


    return {
        ...state
    }
}

export default rootReducer