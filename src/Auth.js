import React, {Component} from 'react'
import App from './App'
import Register from './Register'
import { loadState, saveState } from './localStorage'

class Auth extends Component {

    state = {
        login: "",
        pass: "",
        isLoggedIn: false
    }

    componentDidMount(){
        this.setState(loadState())
    }

    render(){
        return this.state.isLoggedIn ? <App/> : <Register/>
    }
}

export default Auth