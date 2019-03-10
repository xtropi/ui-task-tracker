import React, {Component} from 'react'
import { connect } from 'react-redux'
import { auth } from '../actions/authAction'
import { Redirect } from 'react-router'
import { clearState } from '../localStorage'
import { setAlert } from '../actions/setAlertAction'

class TaskList extends Component {

	componentDidMount(){
		// Logout and empty storage
		clearState()
		this.props.auth(false)
		this.props.setAlert('LOGOUT')
	}

	render(){
		return (<Redirect to='/'/>)
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn
	}
}

export default connect(mapStateToProps, {auth, setAlert})(TaskList)