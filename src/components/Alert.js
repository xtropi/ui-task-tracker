import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/setAlertAction';

class Alert extends Component {
	componentDidMount() {
		setTimeout(() => {
			this.props.setAlert(null)
		}, 3000)
	}

	render() {
		const defaultStyles = {
			userSelect: 'none',
			width: 'auto',
			height: 'auto',
			marginLeft: 'auto',
			marginRight: 'auto'
		}

		let label = 'Undefined error!' 
		let type = 'alert-danger'

		switch(this.props.alert) {
		case 'AUTH_FAIL':
			label ='Your loginpass is wrong or user does not exist!'
			type = 'alert-danger'
			break
		case 'GET_TASKS_FAIL':
			label ='Cant get tasks! (Server or connection error)'
			type = 'alert-danger'
			break
		case 'WRONG_USER':
			label ='No permissions!'
			type = 'alert-danger'
			break
		case 'SUCCESS_DELETE':
			label ='Deleted successfully!'
			type = 'alert-success'
			break
		case 'SUCCESS_CREATE':
			label ='Created successfully!'
			type = 'alert-success'
			break
		case 'SUCCESS_CHANGE':
			label ='Changed successfully!'
			type = 'alert-success'
			break
		case 'LOGIN':
			label ='Login successfully!'
			type = 'alert-success'
			break
		case 'LOGOUT':
			label ='Logout successfully!'
			type = 'alert-success'
			break
		}
				

		return (
			<div className='fixed-bottom justify-content-center'>
				<div
					style={defaultStyles}
					className={`alert ${type} text-center`}
					role='alert'
				>
					{label}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	alert: state.alert
})

export default connect(
	mapStateToProps,
	{ setAlert }
)(Alert)