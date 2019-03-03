import React, {Component} from 'react'
import { connect } from 'react-redux'
import { auth } from './actions/authAction'
import App from './App'
import Register from './Register'
import { loadState, saveState } from './localStorage'

class Auth extends Component {

    state = {
        isLoggedIn: false,
        alert: null
    }

    componentDidMount(){
        this.setState(loadState())
    }

    render(){
        return this.props.isLoggedIn ? <App/> : <Register/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth)