
const initState = {
    isLoggedIn: false,
    alert: null
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'AUTH') {
        return {
            ...state,
            isLoggedIn: action.isLoggedIn
        }
    }
    return {
        ...state
    }
}

export default rootReducer