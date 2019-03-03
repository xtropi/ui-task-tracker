import React, {Component} from 'react'
import { connect } from 'react-redux'
import { auth } from '../actions/authAction'
import { Route, Redirect } from 'react-router'
import { loadState, saveState } from '../localStorage'

class TaskList extends Component {
    state = {
        isLoggedIn: false,
        alert: null
    }

    componentDidMount(){
        saveState(this.state)
        this.props.auth(this.state.isLoggedIn)
    }

    render(){
        return (<Redirect to="/"/>)
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (isLoggedIn) => { dispatch(auth(isLoggedIn)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)