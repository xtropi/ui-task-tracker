import React, {Component} from 'react'
import { Route, Redirect } from 'react-router'
import { loadState, saveState } from '../localStorage'

class TaskList extends Component {
    state = {
        login: "",
        pass: "",
        isLoggedIn: false,
        alert: null
    }

    render(){
        saveState(this.state)
        window.location.reload()
        return (<Redirect to="/"/>)
    }
}

export default TaskList