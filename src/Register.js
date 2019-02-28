import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import { loadState, saveState } from './localStorage'
import usersMock from '../usersMock'

class Register extends Component {
    state = {
        login: "",
        pass: "",
        isLoggedIn: false
    }

    componentDidMount(){
        this.setState(loadState())
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        usersMock.find((user)=>{
            if ((user.login===this.state.login)&&(user.pass===this.state.pass)){
                this.setState({...this.state, isLoggedIn: true},()=>{
                    saveState(this.state)
                    window.location.reload()
                })
            }
        })
        if (this.state.isLoggedIn===false){console.log("alert")}
    }

    handleInput = (e)=>{
        const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
        this.setState({...this.state, [e.currentTarget.name]: value})
    }

    render(){
        return(
            <div className="Register row" onSubmit={this.handleSubmit}>
                <form className="mx-auto my-auto">
                <div className="form-group">
                    <label for="exampleInputLogin1">Email address</label>
                    <input name="login" onChange={this.handleInput} value={this.state.login} type="login" className="form-control" id="exampleInputLogin1" aria-describedby="emailHelp" placeholder="Enter login"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input name="pass" onChange={this.handleInput} value={this.state.pass} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )

    }
}

export default Register