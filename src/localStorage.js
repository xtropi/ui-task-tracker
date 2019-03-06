export const loadState = () =>{
    try {
        const serializedState = localStorage.getItem('task_tracker')
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
        localStorage.setItem('task_tracker', serializedState)
    } catch (err){
        console.log(err)
    }
}

export const clearState = () => {
    try {
        localStorage.removeItem('task_tracker')
    } catch (err){
        console.log(err)
    }
}
