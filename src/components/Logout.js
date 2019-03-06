import React, {Component} from 'react'
import { connect } from 'react-redux'
import { auth } from '../actions/authAction'
import { Route, Redirect } from 'react-router'
import { clearState } from '../localStorage'

class TaskList extends Component {

    componentDidMount(){
        // Logout and empty storage
        clearState()
        this.props.auth(false)
        //this.props.history.push("/");
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