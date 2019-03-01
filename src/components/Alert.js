import React, {Component} from 'react'
import { Route, Redirect } from 'react-router'
import { loadState, saveState } from '../localStorage'

class Alert extends Component {
    render(){
        let result = null
        if (this.props.type==="danger"){
            result = (
            <div className="alert alert-danger" role="alert">
                Your login\pass is wrong or user does not exist!
            </div>
            )
        }

        return result
    }
}

export default Alert