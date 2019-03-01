import React, {Component} from 'react'
import { loadState, saveState } from './localStorage'
import {usersMock} from '../usersMockData.json'
import Alert from './components/Alert'

class Register extends Component {
    state = {
        login: "",
        pass: "",
        isLoggedIn: false,
        alert: null
    }

    componentDidMount(){
        let loadedState = loadState()
        
        if (loadedState){
            loadedState.alert = null
            this.setState(loadedState)
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        let matched = usersMock.find((user)=>{ 
            if ((user.login===this.state.login)&&(user.pass===this.state.pass)){
                return user
            }
        })

        if (matched) { 
            return this.setState({...this.state, isLoggedIn: true, alert: null},()=>{
                saveState(this.state)
                window.location.reload()
            })
        }

        if (this.state.isLoggedIn === false) {
            return this.setState({...this.state, alert: "danger"})
        }
    }

    handleInput = (e)=>{
        const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
        this.setState({...this.state, [e.currentTarget.name]: value})
    }

    render(){
        return(
            <div className="Register row" onSubmit={this.handleSubmit}>
                <form className="mx-auto my-auto text-center w-25">
                <h1 className="form-group text-center font-weight-bold">Task tracker</h1>
                {this.state.alert != null && <Alert type="danger"/>}
                <div className="form-group">
                    <input name="login" onChange={this.handleInput} value={this.state.login} type="login" className="form-control" id="exampleInputLogin1" aria-describedby="emailHelp" placeholder="Enter login"/>
                </div>
                <div className="form-group">
                    <input name="pass" onChange={this.handleInput} value={this.state.pass} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
            </div>
        )

    }
}

export default Register