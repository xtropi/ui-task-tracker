
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
}

let getTasksByStatus = (tasks, status)=>{
    let statusTasks = tasks.filter((task)=>task.status==status)
    return statusTasks
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

    if (action.type === 'TASKS_SET') {
        let newScrumDesk = {
            planning: getTasksByStatus(action.tasks, 'planning'),
            processing: getTasksByStatus(action.tasks, 'processing'),
            done: getTasksByStatus(action.tasks, 'done'),
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
        

        let newScrumDesk = {
            planning: getTasksByStatus(newTasks, 'planning'),
            processing: getTasksByStatus(newTasks, 'processing'),
            done: getTasksByStatus(newTasks, 'done'),
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