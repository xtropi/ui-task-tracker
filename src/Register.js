import React, {Component} from 'react'
import { connect } from 'react-redux'
import { config } from '../config'
import bcrypt from 'bcryptjs'
import { auth } from './actions/authAction'
import axios from 'axios'
import { loadState, saveState } from './sessionStorage'
import { setAlert } from './actions/setAlertAction'
import Alert from './components/Alert'

class Register extends Component {
    state = {
    	login: '',
    	pass: '',
    }
		
		sendAuthData = async (authData) => {
			let result = await axios.post(`${config.beString}${config.beServiceNames.auth}`, {authData: authData})
			if (result.data.msg=='Success'){
				let isLoggedIn = true
				//saving into sessionStorage
				let {login} = result.data.authData
				let {passHash} = result.data.authData
				saveState({login, passHash, isLoggedIn})
				//saving into redux storage
				this.props.auth({login, passHash, isLoggedIn})
				this.props.setAlert('LOGIN')
			} else {
    		this.props.setAlert('AUTH_FAIL')
    	}
		}

    handleSubmit = (e)=>{
			e.preventDefault()
			console.log(config)
    	bcrypt.hash(this.state.pass, config.salt, (err, hash)=>{
    		if (err){
    			return console.log(err);
    		}
    		//password -> hash;
    		this.sendAuthData({login:this.state.login, passHash: hash})
    	})
    	
    }

    handleInput = (e)=>{
    	const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
    	this.setState({...this.state, [e.currentTarget.name]: value})
    }

    render(){
    	return(
    		<div className='Register row no-gutters' >
    			<form className='mx-auto my-auto text-center w-25' onSubmit={this.handleSubmit}>
    				<h1 className='form-group text-center font-weight-bold'>Task tracker</h1>
    				<div className='form-group'>
    					<input name='login' onChange={this.handleInput} value={this.state.login} type='login' className='form-control' id='exampleInputLogin1' aria-describedby='emailHelp' placeholder='Enter login'/>
    				</div>
    				<div className='form-group'>
    					<input name='pass' onChange={this.handleInput} value={this.state.pass} type='password' className='form-control' id='exampleInputPassword1' placeholder='Password'/>
    				</div>
    				<button type='submit' className='btn btn-primary'>Sign in</button>
    			</form>
    			{this.props.alert && <Alert />}
    		</div>
    	)

    }
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn,
		alert: state.alert,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		auth: (authData) => { dispatch(auth(authData)) },
		setAlert: (alert) => { dispatch(setAlert(alert)) },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)