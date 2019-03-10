import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/setAlertAction';

class Alert extends Component {
	componentDidMount() {
		setTimeout(() => {
			this.props.setAlert(null);
		}, 3000);
	}

	render() {
		const defaultStyles = {
			userSelect: 'none',
			width: 'auto',
			height: 'auto',
			marginLeft: 'auto',
			marginRight: 'auto'
		};
		const label =
      this.props.alert === 'AUTH_FAIL'
      	? 'Your loginpass is wrong or user does not exist!'
      	: 'No permissions!';

		return (
			<div className='fixed-bottom justify-content-center'>
				<div
					style={defaultStyles}
					className='alert alert-danger text-center'
					role='alert'
				>
					{label}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	alert: state.alert
});

export default connect(
	mapStateToProps,
	{ setAlert }
)(Alert);