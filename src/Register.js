import React, {Component} from 'react'
import { connect } from 'react-redux'
import { auth } from './actions/authAction'
import { loadState, saveState } from './localStorage'
import Alert from './components/Alert'

/*MOCKDATA->*/
import {usersMock} from '../usersMockData.json'
/*<-MOCKDATA*/

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

        //#### AUTH MOCKUP -> ####
        /* 
            need to be changed to real server-based auth request through fetch(),
            set JWT to localStorage\sessionStorage
            and pass user based on token
        */ 

        let matched = usersMock.find((user)=>{ 
            if ((user.login===this.state.login)&&(user.pass===this.state.pass)){
                return user
            }
        })

        if (matched) { 
            return this.setState({isLoggedIn: true, alert: null},()=>{
                //saving into localStorage
                 /*
                    maybe would be better to use sessionStorage
                 */
                let {isLoggedIn, alert} = this.state
                saveState({isLoggedIn, alert})
                this.props.auth(this.state.isLoggedIn)
            })
        }

        if (this.state.isLoggedIn === false) {
            return this.setState({...this.state, alert: "danger"})
        }
        //#### <- AUTH MOCKUP ####
    }

    handleInput = (e)=>{
        const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
        this.setState({...this.state, [e.currentTarget.name]: value})
    }

    render(){
        return(
            <div className="Register row">
                <form className="mx-auto my-auto text-center w-25" onSubmit={this.handleSubmit}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)