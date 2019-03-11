import React, {Component} from 'react'
import { connect } from 'react-redux'
import { auth } from './actions/authAction'
import { setAlert } from './actions/setAlertAction'
import App from './App'
import Register from './Register'
import { loadState, saveState } from './sessionStorage'

class Auth extends Component {

	componentDidMount(){
		// Auto auth with session
		let loadedState = loadState()
		if (loadedState){
			loadedState.alert = null
			this.props.auth(loadedState)
		}
	}

	render(){
		return this.props.isLoggedIn ? <App/> : <Register/>
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn,
		alert: state.alert,
	}
}

export default connect(mapStateToProps, { auth, setAlert })(Auth)